import { createContext } from 'react';
import { IAuthOutput, ILoginUser, IRegisterUser, IUser } from '../../interfaces';

interface ContextProps {
  isLoggedIn: boolean;
  user?: IUser;
  //Auth Methods
  registerUser: (userData: IRegisterUser) => Promise<IAuthOutput>;
  loginUser: (userData: ILoginUser) => Promise<IAuthOutput>;
  logoutUser: () => void;
}

export const AuthContext = createContext({} as ContextProps);
