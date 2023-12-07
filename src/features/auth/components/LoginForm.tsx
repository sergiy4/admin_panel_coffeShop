import { personLoginSchema, PersonLoginType } from '../schemas';
import { useForm, FormProvider } from 'react-hook-form';
import FormInput from '../../../components/FormInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLoginMutation } from '../authApi/authApi';
import { setCredentials } from '../authApi/authSlice';
import { useDispatch } from 'react-redux';
import usePersist from '../hooks/usePersist';
import getQueryErrorMessage from '../../../utils/getQueryErrorMessage';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  let errorMessage;
  const navigate = useNavigate();
  const [persist, togglePersist] = usePersist();
  const dispatch = useDispatch();

  const methods = useForm<PersonLoginType>({
    resolver: zodResolver(personLoginSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const [login, { isError, error }] = useLoginMutation();

  if (isError) {
    errorMessage = getQueryErrorMessage(error);
  }
  const onSubmit = handleSubmit(async (data) => {
    try {
      const credentials = await login(data).unwrap();

      dispatch(setCredentials(credentials));
      navigate('/');

      // TODO: clear form
      // TODO: redirect to main page
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={(e) => e.preventDefault()}>
          <FormInput
            label='Email'
            placeholder='Email'
            id={'email'}
            type='text'
            name='email'
            errors={errors}
          />
          <FormInput
            label='Password'
            placeholder='Password'
            id={'password'}
            type='password'
            name='password'
            errors={errors}
          />
          <button onClick={onSubmit}>Login</button>
          <label htmlFor='persist'>Trust this device?</label>
          <input
            id='persist'
            type='checkbox'
            onChange={togglePersist}
            checked={persist}
          />
        </form>
      </FormProvider>
      {errorMessage ? <p>{errorMessage}</p> : null}
    </>
  );
};

export default LoginForm;
