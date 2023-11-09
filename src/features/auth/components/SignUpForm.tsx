import { personSchema, PersonType } from '../schemas';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '../../../components/FormInput';
import { useSignUpMutation } from '../authApi/authApi';

const SignUpForm = () => {
  const methods = useForm<PersonType>({ resolver: zodResolver(personSchema) });
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const [signUp, { isSuccess, data, isError, error }] = useSignUpMutation();
  if (isError) {
    console.log(error);
  } else if (isSuccess) {
    // TODO: redirect on login page
    console.log(data);
  }
  const onSubmit = handleSubmit(async (data) => {
    data.role = 'USER';
    await signUp(data);
  });
  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={(e) => e.preventDefault()}>
          <FormInput
            label="Name"
            placeholder="Name"
            id={'name'}
            type="text"
            name="name"
            errors={errors}
          />
          <FormInput
            label="Surname"
            placeholder="Surname"
            id={'surname'}
            type="text"
            name="surname"
            errors={errors}
          />
          <FormInput
            label="Email"
            placeholder="Email"
            id={'email'}
            type="text"
            name="email"
            errors={errors}
          />
          <FormInput
            label="City"
            placeholder="City"
            id={'city'}
            type="text"
            name="city"
            errors={errors}
          />
          <FormInput
            label="Country"
            placeholder="Country"
            id={'country'}
            type="text"
            name="country"
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
            SignUp
          </button>
        </form>
      </FormProvider>
    </>
  );
};

export default SignUpForm;
