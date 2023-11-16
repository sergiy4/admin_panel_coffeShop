import { NavLink } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import LogoutButton from '../features/auth/components/LogoutButton';

const NavBar = () => {
  const { isAdmin, isManager, role } = useAuth();

  return (
    <nav>
      <ul>
        {role === '' ? (
          <>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/signup">Sign Up</NavLink>
            </li>
          </>
        ) : null}

        {isAdmin || isManager ? (
          <>
            <li>
              <NavLink to="/products">Products</NavLink>
            </li>
            <li>
              <NavLink to="/categories">Categories</NavLink>
            </li>
            <li>
              <NavLink to="/orders?page=1">Orders</NavLink>
            </li>
            <li>
              <NavLink to="/users">Users</NavLink>
            </li>
            <li>
              <NavLink to="/statistic">Statistic</NavLink>
            </li>
          </>
        ) : null}
        {isAdmin ? (
          <>
            <li>
              <NavLink to="/profile">Create profile</NavLink>
            </li>
            <li>
              <NavLink to="/team">Manage team</NavLink>
            </li>
          </>
        ) : null}
        {/* TODO: change to auth button  */}
        {role !== '' ? (
          <li>
            <LogoutButton />
          </li>
        ) : null}
      </ul>
    </nav>
  );
};

export default NavBar;
