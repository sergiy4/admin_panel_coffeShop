import { useSendLogoutMutation } from '../authApi/authApi';

const LogoutButton = () => {
  //
  const [logout, { isError, error, isSuccess }] = useSendLogoutMutation();

  if (isError) {
    console.log(error);
  } else if (isSuccess) {
    // TODO: Navigate to main page
  }

  return (
    <>
      {/* TODO: add logout icon */}
      <button onClick={logout}>Logout</button>
    </>
  );
};
export default LogoutButton;
