import { LOGIN_USER, REGISTER_USER, LOGOUT_USER, CHEK_TOKEN } from '../actions';

const initialState = {
  user: {},
  accessToken: '',
  isAuthorized: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {

    case LOGIN_USER:
      return {
        ...state,
        user: action.data.user,
        isAuthorized: true,
      };

    case REGISTER_USER:
      return {
        ...state,
        user: action.data.user,
        isAuthorized: true,
      };

    case LOGOUT_USER:
      return {
        ...state,
        user: {},
        isAuthorized: false,
      };

    case CHEK_TOKEN:
      return {
        ...state,
        user: action.data.user,
        isAuthorized: true,
      };
      
    default:
      return state;
  }
};