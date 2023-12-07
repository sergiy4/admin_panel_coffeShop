import { useLocation, Navigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

interface RequireAuthProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

const RequireAuth = ({ children, allowedRoles }: RequireAuthProps) => {
  const location = useLocation();
  const { role } = useAuth();

  const content = allowedRoles.find((allowedRole) =>
    role.includes(allowedRole)
  ) ? (
    children
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );

  return content;
};

export default RequireAuth;
