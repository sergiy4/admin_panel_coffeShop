import { Outlet, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useRefreshMutation } from '../authApi/authApi';
import usePersist from '../hooks/usePersist';
import { useSelector } from 'react-redux';
import { SelectToken } from '../authApi/authSlice';
import { isCustomErrorType } from '../../../utils/helpers';
import getQueryErrorMessage from '../../../utils/getQueryErrorMessage';

const PersistLogin = () => {
  const [persist] = usePersist();
  const token = useSelector(SelectToken);
  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      console.log('verify refresh token');

      try {
        await refresh();
        setTrueSuccess(true);
      } catch (err) {
        console.log(err);
      }
    };

    if (!token && persist) verifyRefreshToken();
  }, []);

  let content;

  if (!persist) {
    // persist: no
    console.log('persist: no');
    content = <Outlet />;
  } else if (isLoading) {
    console.log('isLoading');
    // persist: yes
    // token: no
    content = <p>Loading...</p>;
  } else if (isError) {
    // persist: yes
    // token: no

    const errorMessage = getQueryErrorMessage(error);

    content = (
      <>
        <p>{errorMessage}</p>
        <Link to="/login"> Pleas login again</Link>
      </>
    );
  } else if (isSuccess && trueSuccess) {
    console.log('Success');
    // persist: yes
    // token: yes
    content = <Outlet />;
  } else if (token && isUninitialized) {
    console.log('token and un');
    // persist: yes
    // token: no
    content = <Outlet />;
  }

  return content;
};

export default PersistLogin;
