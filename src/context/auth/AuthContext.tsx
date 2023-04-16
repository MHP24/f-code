import { createContext } from 'react';
import { IAuthOutput, IRegisterUser, IUser } from '@/interfaces';

interface ContextProps {
  isLoggedIn: boolean;
  user?: IUser;
  registerUser: (userData: IRegisterUser) => Promise<IAuthOutput>;
  logoutUser: () => void;
}

export const AuthContext = createContext({} as ContextProps);
