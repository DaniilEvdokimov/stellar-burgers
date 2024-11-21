import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { useParams } from 'react-router-dom';
import { fetchFeed } from '../../services/reducers/feedSlice';
import { fetchOrders } from '../../services/reducers/ordersSlice';

export const OrderInfo: FC = () => {
  const { number } = useParams();
  const dispatch = useAppDispatch();
  const { ingredients } = useAppSelector((state) => state.ingredientsReducer);
  const { orders } = useAppSelector((state) => state.ordersReducer);
  const feedOrder = useAppSelector((state) =>
    state.feedReducer.orders.find((item) => item.number === Number(number))
  );
  const orderData =
    feedOrder || orders.find((item) => item.number === Number(number));

  useEffect(() => {
    if (!orderData) {
      if (location.pathname.startsWith('/profile/orders')) {
        dispatch(fetchOrders());
      } else {
        dispatch(fetchFeed());
      }
    }
  }, [dispatch, orderData, location.pathname]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
