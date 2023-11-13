import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import PersistLogin from '../features/auth/components/PersistLogin';
const Layout = () => {
  const { pathname } = useLocation();
  return (
    <>
      <Header />
      {pathname === '/' || pathname === '/login' || pathname === '/signup' ? (
        <Outlet />
      ) : (
        <PersistLogin />
      )}
    </>
  );
};

export default Layout;
