import '../../index.css';
import styles from './app.module.css';
import { Routes, Route, Outlet, useNavigate } from 'react-router-dom';

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
                <Modal title='' onClose={() => navigate('profile/orders')}>
                  <OrderInfo />
                </Modal>
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
