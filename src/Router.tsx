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
const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <ErrorBoundary />,
      children: [
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/signup',
          element: <SignUp />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
