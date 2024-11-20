import { useLocation, Navigate } from 'react-router-dom';
import { useAppSelector } from '../../services/store';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactNode;
};

export default function ProtectedRoute({
  onlyUnAuth,
  children
}: ProtectedRouteProps) {
  const location = useLocation();
  const { user } = useAppSelector((state) => state.userReducer);

  // Определяем предыдущую страницу или используем главную страницу как дефолтную
  const from = location.state?.from || '/';

  if (!onlyUnAuth && !user) {
    // Если доступ запрещен неавторизованным пользователям и пользователь не авторизован...
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  // Если разрешен неавторизованный доступ, а пользователь авторизован...
  if (onlyUnAuth && user) {
    // ...то отправляем его на предыдущую страницу
    return <Navigate replace to={from} />;
  }

  return children;
}
