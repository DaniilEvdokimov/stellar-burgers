import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useAppDispatch, useAppSelector } from '../../services/store';
import {
  clearOrderConstructor,
  getNewOrderData,
  orderBurger
} from '../../services/reducers/newOrderSlice';
import { useLocation, useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const { constructorItems, orderRequest, orderModalData } = useAppSelector(
    (state) => state.newOrderReducer
  );
  const newOrderData = useAppSelector((state) =>
    getNewOrderData({ newOrder: state.newOrderReducer })
  );
  const { user, isLoading } = useAppSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const location = useLocation();

  const onOrderClick = () => {
    if (!user && !isLoading)
      return navigate('/login', {
        state: { locationState: { background: location } }
      });
    if (constructorItems.bun && !orderRequest) {
      dispatch(orderBurger(newOrderData));
    } else return;
  };
  const closeOrderModal = () => {
    dispatch(clearOrderConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
