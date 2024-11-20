import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { getUserOrders } from '../../services/reducers/userSlice';
import { useAppDispatch, useAppSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state.userReducer);

  useEffect(() => {
    dispatch(getUserOrders());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
