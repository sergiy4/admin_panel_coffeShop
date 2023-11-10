import { personLoginSchema, PersonLoginType } from '../schemas';
import { useForm, FormProvider } from 'react-hook-form';
import FormInput from '../../../components/FormInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLoginMutation } from '../authApi/authApi';
import { setCredentials } from '../authApi/authSlice';
import { useDispatch } from 'react-redux';
const LoginForm = () => {
  const dispatch = useDispatch();
  const methods = useForm<PersonLoginType>({
    resolver: zodResolver(personLoginSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const [login, { isError, error, isSuccess, data }] = useLoginMutation();

  if (isError) {
    console.log(error);
  } else if (isSuccess) {
    if (data) {
      dispatch(setCredentials(data));
      // TODO: clear form
      // TODO: redirect to main page
    }
  }
  const onSubmit = handleSubmit(async (data) => {
    await login(data);
  });
  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={(e) => e.preventDefault()}>
          <FormInput
            label="Email"
            placeholder="Email"
            id={'email'}
            type="text"
            name="email"
            errors={errors}
          />
          <FormInput
            label="Password"
            placeholder="Password"
            id={'password'}
            type="password"
            name="password"
            errors={errors}
          />
          <button className="btn login_btn" onClick={onSubmit}>
            Login
          </button>
        </form>
      </FormProvider>
    </>
  );
};

export default LoginForm;
