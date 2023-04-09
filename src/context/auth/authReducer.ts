import { IAuthState, IUser } from '../../interfaces';


export type IAuthActions =
  | { type: '[Auth] - Register', payload: IUser }
  | { type: '[Auth] - Login', payload: IUser }
  | { type: '[Auth] - Logout' };


export const authReducer = (state: IAuthState, action: IAuthActions) => {
  switch (action.type) {
    case '[Auth] - Register':
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload
      }

    case '[Auth] - Login':
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload
      }

    case '[Auth] - Logout':
      return {
        ...state,
        isLoggedIn: false,
        user: undefined,
      }
    default:
      return state;
  }
}