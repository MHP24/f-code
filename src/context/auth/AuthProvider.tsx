import { FC, PropsWithChildren, useReducer } from 'react';
import { AuthContext, authReducer } from './';
import { IAuthState } from '../../interfaces';

const INITIAL_STATE: IAuthState = {
  isLoggedIn: false,
  user: undefined
}

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {

  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);


  const registerUser = () => {

  }

  const loginUser = () => {

  }

  const logoutUser = () => {

  }



  return (
    <AuthContext.Provider
      value={
        state
      }
    >
      {children}
    </AuthContext.Provider>
  );
}
