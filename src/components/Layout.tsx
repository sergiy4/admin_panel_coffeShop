import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import PersistLogin from '../features/auth/components/PersistLogin';
import NavBar from './NavBar';
const Layout = () => {
  const { pathname } = useLocation();
  return (
    <>
      <Header />
      <NavBar />
      {pathname === '/login' || pathname === '/signup' ? (
        <Outlet />
      ) : (
        <PersistLogin />
      )}
    </>
  );
};

export default Layout;
