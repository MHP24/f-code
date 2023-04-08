import { createContext } from 'react';
import { IUser } from '../../interfaces';

interface ContextProps {
  isLoggedIn: boolean;
  user?: IUser;
  //TODO:  Auth Methods
}

export const AuthContext = createContext({} as ContextProps);
