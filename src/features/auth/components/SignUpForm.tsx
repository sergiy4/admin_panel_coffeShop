import { personSignUpSchema, PersonSignUpType } from '../schemas';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '../../../components/FormInput';
import { useSignUpMutation } from '../authApi/authApi';
import getQueryErrorMessage, {
  QueryError,
} from '../../../utils/getQueryErrorMessage';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
  let errorMessage;
  const navigate = useNavigate();
  const methods = useForm<PersonSignUpType>({
    resolver: zodResolver(personSignUpSchema),
  });
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const [signUp, { isError, error }] = useSignUpMutation();

  if (isError) {
    console.log(error);
    errorMessage = getQueryErrorMessage(error);
  }

  const onSubmit = handleSubmit(async (data) => {
    // TODO: In server
    try {
      data.role = 'USER';
      await signUp(data).unwrap();
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  });
  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={(e) => e.preventDefault()}>
          <FormInput
            label='Name'
            placeholder='Name'
            id={'name'}
            type='text'
            name='name'
            errors={errors}
          />
          <FormInput
            label='Surname'
            placeholder='Surname'
            id={'surname'}
            type='text'
            name='surname'
            errors={errors}
          />
          <FormInput
            label='Email'
            placeholder='Email'
            id={'email'}
            type='text'
            name='email'
            errors={errors}
          />
          <FormInput
            label='City'
            placeholder='City'
            id={'city'}
            type='text'
            name='city'
            errors={errors}
          />
          <FormInput
            label='Country'
            placeholder='Country'
            id={'country'}
            type='text'
            name='country'
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
          <button className='btn login_btn' onClick={onSubmit}>
            SignUp
          </button>
        </form>
      </FormProvider>
      {errorMessage ? <p>{errorMessage}</p> : null}
    </>
  );
};

export default SignUpForm;
