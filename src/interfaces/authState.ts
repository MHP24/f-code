import { IUser } from './';

export interface IAuthState {
  isLoggedIn: boolean;
  user?: IUser;
}