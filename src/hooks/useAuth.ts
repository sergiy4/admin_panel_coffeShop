import { useSelector } from 'react-redux';
import { SelectToken } from '../features/auth/authApi/authSlice';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  UserInfo: {
    email: string;
    role: string;
    id: string;
  };
}

const useAuth = () => {
  const token = useSelector(SelectToken);
  let isAdmin = false;
  let isManager = false;
  let status = 'USER';

  if (token) {
    const decode = jwtDecode<JwtPayload>(token);
    const { email, role } = decode.UserInfo;

    isAdmin = role === 'ADMIN' ? true : false;
    isManager = role === 'MANAGER' ? true : false;

    if (isAdmin) status = 'ADMIN';
    if (isManager) status = 'MANAGER';

    return { email, role, status, isAdmin, isManager };
  }

  return { email: '', role: '', status, isAdmin, isManager };
};

export default useAuth;
