
import { authReducer,initialState } from './authReducers';
import { emailTestFirst,emailTestSecond} from '../../utils/testConsts';

import * as types from '../actions';

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle LOGIN_USER', () => {
    expect(
      authReducer(
        initialState,
        {
          type: types.LOGIN_USER,
          data: emailTestFirst,
        }
      )
    ).toEqual({
      ...initialState,
      user: emailTestFirst,
      isAuthorized: true,
    });

    expect(
      authReducer(
        {
          ...initialState,
          user: emailTestFirst ,
          isAuthorized: true,
        },
        {
          type: types.LOGIN_USER,
          data: emailTestSecond,
        }
      )
    ).toEqual({
      ...initialState,
      user: emailTestSecond,
      isAuthorized: true,
    });
  });

  it('should handle REGISTER_USER', () => {
    expect(
      authReducer(
        initialState,
        {
          type: types.REGISTER_USER,
          data: emailTestFirst,
        }
      )
    ).toEqual({
      ...initialState,
      user: emailTestFirst,
      isAuthorized: true,
    });

    expect(
      authReducer(
        {
          ...initialState,
          user: emailTestFirst,
          isAuthorized: true,
        },
        {
          type: types.REGISTER_USER,
          data: emailTestSecond,
        }
      )
    ).toEqual({
      ...initialState,
      user: emailTestSecond,
      isAuthorized: true,
    });
  });

  it('should handle LOGOUT_USER', () => {
    expect(
      authReducer(
        initialState,
        {
          type: types.LOGOUT_USER,
        }
      )
    ).toEqual(initialState);

    expect(
      authReducer(
        {
          ...initialState,
          user: emailTestFirst,
          isAuthorized: true,
        },
        {
          type: types.LOGOUT_USER,
        }
      )
    ).toEqual(initialState);
  });

  it('should handle CHEK_TOKEN', () => {
    expect(
      authReducer(
        initialState,
        {
          type: types.CHEK_TOKEN,
          data: emailTestFirst,
        }
      )
    ).toEqual({
      ...initialState,
      user: emailTestFirst,
      isAuthorized: true,
    });

    expect(
      authReducer(
        {
          ...initialState,
          user: emailTestFirst,
          isAuthorized: true,
        },
        {
          type: types.CHEK_TOKEN,
          data: emailTestSecond,
        }
      )
    ).toEqual({
      ...initialState,
      user: emailTestSecond,
      isAuthorized: true,
    });
  });
});