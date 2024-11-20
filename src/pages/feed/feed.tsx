import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { fetchFeed } from '../../services/reducers/feedSlice';
import { useAppDispatch, useAppSelector } from '../../services/store';

export const Feed: FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, orders } = useAppSelector((state) => state.feedReducer);

  useEffect(() => {
    dispatch(fetchFeed());
  }, []);

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <FeedUI orders={orders} handleGetFeeds={() => dispatch(fetchFeed())} />
      )}
    </>
  );
};
