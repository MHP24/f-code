import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { AuthContext, authReducer } from './';
import { IAuthOutput, IAuthState, ILoginUser, IRegisterUser } from '../../interfaces';
import Cookies from 'js-cookie';
import { fCodeApi } from '@/api';
import axios from 'axios';
import { useRouter } from 'next/router';

const INITIAL_STATE: IAuthState = {
  isLoggedIn: false,
  user: undefined
}

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {

  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);
  const router = useRouter();

  useEffect(() => {
    if (!Cookies.get('token')) return;

    (async () => {
      try {
        const { data } = await fCodeApi.get('/user/validate-token');
        const { token, user } = data;
        Cookies.set('token', token);
        dispatch({ type: '[Auth] - Login', payload: user });
      } catch (error) {
        Cookies.remove('token');
      }
    })();
  }, []);

  const registerUser = async (userData: IRegisterUser): Promise<IAuthOutput> => {
    try {
      const { data } = await fCodeApi.post('/user/register', userData);
      const { token, user } = data;

      dispatch({ type: '[Auth] - Register', payload: user });
      Cookies.set('token', token);
      router.replace('/');
      return { hasError: false };
    } catch (error) {
      return {
        hasError: true,
        message:
          (
            axios.isAxiosError(error) ?
              error.response?.data.error
              :
              'Unexpected error, try again'
          )
      };
    }
  }

  const loginUser = async (userData: ILoginUser): Promise<IAuthOutput> => {
    try {
      const { data } = await fCodeApi.post('/user/login', userData);
      const { token, user } = data;

      dispatch({ type: '[Auth] - Login', payload: user });
      Cookies.set('token', token);
      router.replace('/');
      return { hasError: false };

    } catch (error) {
      return {
        hasError: true,
        message:
          (
            axios.isAxiosError(error) ?
              error.response?.data.error
              :
              'Unexpected error, try again'
          )
      };
    }
  }

  const logoutUser = () => {
    dispatch({ type: '[Auth] - Logout' });
    Cookies.remove('token');
    router.replace('/');
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        registerUser,
        loginUser,
        logoutUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
