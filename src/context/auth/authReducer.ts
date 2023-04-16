import { IAuthState, IUser } from '@/interfaces';

export type IAuthActions = { type: '[Auth] - Login', payload: IUser };

export const authReducer = (state: IAuthState, action: IAuthActions) => {
  switch (action.type) {
    case '[Auth] - Login':
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload
      }

    default:
      return state;
  }
}