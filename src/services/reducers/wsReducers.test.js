import { wsReducer } from './wsReducers';
import * as types from '../actions';
import { testMessage, addedTestMessage } from '../../utils/testConsts';

describe('ws reducer', () => {
  it('should return the initial state', () => {
    expect(wsReducer(undefined, {})).toEqual({
      wsConnected: false,
      messages: {
        success: false,
        orders: [],
        total: 0,
        totalToday: 0,
      },
    });
  });

  it('should handle WS_CONNECTION_SUCCESS', () => {
    expect(
      wsReducer(
        {
          wsConnected: false,
          messages: {
            success: false,
            orders: [],
            total: 0,
            totalToday: 0,
          },
        },
        {
          type: types.WS_CONNECTION_SUCCESS,
        }
      )
    ).toEqual({
      wsConnected: true,
      messages: {
        success: false,
        orders: [],
        total: 0,
        totalToday: 0,
      },
    });

    expect(
      wsReducer(
        {
          wsConnected: false,
          error: 'some errors',
          messages: {
            success: false,
            orders: [],
            total: 0,
            totalToday: 0,
          },
        },
        {
          type: types.WS_CONNECTION_SUCCESS,
        }
      )
    ).toEqual({
      wsConnected: true,
      error: undefined,
      messages: {
        success: false,
        orders: [],
        total: 0,
        totalToday: 0,
      },
    });
  });

  it('should handle WS_CONNECTION_ERROR', () => {
    expect(
      wsReducer(
        {
          wsConnected: false,
          messages: {
            success: false,
            orders: [],
            total: 0,
            totalToday: 0,
          },
        },
        {
          type: types.WS_CONNECTION_ERROR,
          payload: 'some error',
        }
      )
    ).toEqual({
      wsConnected: false,
      error: 'some error',
      messages: {
        success: false,
        orders: [],
        total: 0,
        totalToday: 0,
      },
    });

    expect(
      wsReducer(
        {
          wsConnected: false,
          error: 'some errors',
          messages: {
            success: false,
            orders: [],
            total: 0,
            totalToday: 0,
          },
        },
        {
          type: types.WS_CONNECTION_ERROR,
          payload: 'other error',
        }
      )
    ).toEqual({
      wsConnected: false,
      error: 'other error',
      messages: {
        success: false,
        orders: [],
        total: 0,
        totalToday: 0,
      },
    });
  });

  it('should handle WS_CONNECTION_CLOSED', () => {
    expect(
      wsReducer(
        {
          wsConnected: true,
          messages: testMessage,
        },
        {
          type: types.WS_CONNECTION_CLOSED,
        }
      )
    ).toEqual({
      wsConnected: false,
      error: undefined,
      messages: testMessage,
    });

    expect(
      wsReducer(
        {
          wsConnected: true,
          error: 'some errors',
          messages: {
            success: false,
            orders: [],
            total: 0,
            totalToday: 0,
          },
        },
        {
          type: types.WS_CONNECTION_CLOSED,
        }
      )
    ).toEqual({
      wsConnected: false,
      error: undefined,
      messages: {
        success: false,
        orders: [],
        total: 0,
        totalToday: 0,
      },
    });
  });

  it('should handle WS_GET_MESSAGE', () => {

    expect(
      wsReducer(
        {
          wsConnected: false,
          messages: {
            success: false,
            orders: [],
            total: 0,
            totalToday: 0,
          },
        },
        {
          type: types.WS_GET_MESSAGE,
          payload: testMessage,
        }
      )
    ).toEqual({
      wsConnected: false,
      error: undefined,
      messages: testMessage,
    });
    
    expect(
      wsReducer(
        {
          wsConnected: true,
          error: undefined,
          messages: testMessage,
        },
        {
          type: types.WS_GET_MESSAGE,
          payload: addedTestMessage,
        }
      )
    ).toEqual({
      wsConnected: true,
      error: undefined,
      messages: addedTestMessage,
    });
  });
});