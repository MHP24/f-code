import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { AuthContext, authReducer } from './';
import { IAuthOutput, IAuthState, IRegisterUser, IUser } from '@/interfaces';
import { fCodeApi } from '@/api';
import axios from 'axios';

const INITIAL_STATE: IAuthState = {
  isLoggedIn: false,
  user: undefined
}

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {

  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);
  const { data, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      console.log({ user: data.user });
      dispatch({ type: '[Auth] - Login', payload: data?.user as IUser });
    }
  }, [data, status]);

  const registerUser = async (userData: IRegisterUser): Promise<IAuthOutput> => {
    try {
      await fCodeApi.post('/user/register', userData);
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

  const logoutUser = () => signOut();

  return (
    <AuthContext.Provider
      value={{
        ...state,
        registerUser,
        logoutUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
