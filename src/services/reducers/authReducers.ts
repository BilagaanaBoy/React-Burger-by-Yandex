import { LOGIN_USER, REGISTER_USER, LOGOUT_USER, CHEK_TOKEN } from '../actions';

import type { TUserData } from '../../utils/types';
import type { TAuthActions } from '../actions/authActions';

type TinitialState = {
  user: TUserData;
  accessToken: string;
  isAuthorized: boolean;
}

export const initialState:TinitialState = {
  user: {
    email: '',
    password: '',
  },
  accessToken: '',
  isAuthorized: false,
};

export const authReducer = (state = initialState, action: TAuthActions): TinitialState => {
  switch (action.type) {

    case LOGIN_USER:
      return {
        ...state,
        user: action.data,
        isAuthorized: true,
      };

    case REGISTER_USER:
      return {
        ...state,
        user: action.data,
        isAuthorized: true,
      };

    case LOGOUT_USER:
      return {
        ...state,
        user: {
          email: '',
          password: '',
        },
        isAuthorized: false,
      };

    case CHEK_TOKEN:
      return {
        ...state,
        user: action.data,
        isAuthorized: true,
      };
      
    default:
      return state;
  }
};