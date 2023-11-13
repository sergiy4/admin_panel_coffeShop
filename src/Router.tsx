import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import Main from './features/main/pages/Main';
import Login from './features/auth/pages/Login';
import SignUp from './features/auth/pages/SignUp';
import Categories from './features/category/pages/Categories';
import Orders from './features/order/pages/Orders';
import Products from './features/product/pages/Products';
import CurrentProduct from './features/product/pages/CurrentProduct';
import Statistic from './features/statistic/pages/Statistic';
import ManageTeam from './features/team/pages/ManageTeam';
import Users from './features/users/pages/Users';
import RequireAuth from './features/auth/components/RequireAuth';
import { ROLES } from './config/roles';
import CreateProduct from './features/product/pages/CreateProduct';
import CreateProfile from './features/profile/pages/CreateProfile';

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <ErrorBoundary />,
      children: [
        // public routes
        {
          index: true,
          element: <Main />,
        },
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/signup',
          element: <SignUp />,
        },

        // protected routes
        {
          path: '/products',
          element: (
            <RequireAuth allowedRoles={[ROLES.admin, ROLES.manager]}>
              <Products />
            </RequireAuth>
          ),
        },
        {
          path: '/products/create',
          element: (
            <RequireAuth allowedRoles={[ROLES.admin, ROLES.manager]}>
              <CreateProduct />
            </RequireAuth>
          ),
        },
        {
          path: '/products/:productID',
          element: (
            <RequireAuth allowedRoles={[ROLES.admin, ROLES.manager]}>
              <CurrentProduct />
            </RequireAuth>
          ),
        },
        {
          path: '/categories',
          element: (
            <RequireAuth allowedRoles={[ROLES.admin, ROLES.manager]}>
              <Categories />
            </RequireAuth>
          ),
        },
        {
          path: '/orders',
          element: (
            <RequireAuth allowedRoles={[ROLES.admin, ROLES.manager]}>
              <Orders />
            </RequireAuth>
          ),
        },
        {
          path: '/users',
          element: (
            <RequireAuth allowedRoles={[ROLES.admin, ROLES.manager]}>
              <Users />
            </RequireAuth>
          ),
        },
        {
          path: '/profile',
          element: (
            <RequireAuth allowedRoles={[ROLES.admin]}>
              <CreateProfile />
            </RequireAuth>
          ),
        },
        {
          path: '/team',
          element: (
            <RequireAuth allowedRoles={[ROLES.admin]}>
              <ManageTeam />
            </RequireAuth>
          ),
        },
        {
          path: '/statistic',
          element: (
            <RequireAuth allowedRoles={[ROLES.admin, ROLES.manager]}>
              <Statistic />
            </RequireAuth>
          ),
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
