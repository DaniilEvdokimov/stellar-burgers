import '../../index.css';
import styles from './app.module.css';
import {
  Routes,
  Route,
  Outlet,
  useNavigate,
  useLocation
} from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { fetchIngredients } from '../../services/reducers/ingredientsSlice';
import { autoLogin } from '../../services/reducers/userSlice';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import ProtectedRoute from '../protected-route/protected-route';
import InfoAboutIngredient from '../info-about-ingredient/info-about-ingredient';
import InfoAboutFeed from '../info-about-order/info-about-order';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.userReducer);

  useEffect(() => {
    dispatch(fetchIngredients());

    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      dispatch(autoLogin());
    }
  }, [dispatch]);

  useEffect(() => {
    if (user && location.state?.from) {
      navigate(location.state.from);
    }
  }, [user, location.state, navigate]);

  return (
    <Routes>
      <Route
        path='/'
        element={
          <div className={styles.app}>
            <AppHeader />
            <Outlet />
          </div>
        }
      >
        <Route index element={<ConstructorPage />} />
        <Route
          path='feed'
          element={
            <>
              <Feed />
            </>
          }
        />
        <Route
          path='feed/:number'
          element={
            <InfoAboutFeed onClose={() => navigate('/feed')}>
              <OrderInfo />
            </InfoAboutFeed>
          }
        />
        <Route
          path='ingredients/:id'
          element={
            <InfoAboutIngredient onClose={() => navigate('/')}>
              <IngredientDetails />
            </InfoAboutIngredient>
          }
        />
        <Route
          path='login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='profile'
          element={
            <ProtectedRoute>
              <Outlet />
            </ProtectedRoute>
          }
        >
          <Route index element={<Profile />} />
          <Route
            path='orders'
            element={
              <>
                <ProfileOrders />
                <Outlet />
              </>
            }
          >
            <Route
              path=':number'
              element={
                <ProtectedRoute>
                  <Modal title='' onClose={() => navigate('profile/orders')}>
                    <OrderInfo />
                  </Modal>
                </ProtectedRoute>
              }
            />
          </Route>
        </Route>
        <Route path='*' element={<NotFound404 />} />
      </Route>
    </Routes>
  );
};

export default App;
