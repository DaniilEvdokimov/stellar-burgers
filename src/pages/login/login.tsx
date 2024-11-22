import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useAppDispatch } from '../../services/store';
import { login } from '../../services/reducers/userSlice';
import { useLocation, useNavigate } from 'react-router-dom';

export const Login: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(login({ email, password }));

    navigate(
      state?.locationState?.background?.pathname
        ? state.locationState.background.pathname
        : '/'
    );
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
