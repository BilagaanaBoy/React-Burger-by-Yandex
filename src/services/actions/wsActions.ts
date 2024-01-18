import { 
    WS_CONNECTION_START,
    WS_CONNECTION_CLOSE,

    WS_GET_MESSAGE,
    WS_SEND_MESSAGE,

    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED } from './index';

import type { TOrders } from '../../utils/types';

export interface IConnectionStartAction {
  readonly type: typeof WS_CONNECTION_START;
  readonly payload: any;
}
export interface IConnectionCloseAction {
  readonly type: typeof WS_CONNECTION_CLOSE;
  readonly payload: any;
}

export interface IGetMessageAction {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: TOrders;
}
export interface ISendMessageAction {
  readonly type: typeof WS_SEND_MESSAGE;
  readonly payload: any;
}

export interface IConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
  readonly payload: any;
}
export interface IConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: any;
}
export interface IConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
  readonly payload: any;
}


export type TWSActions =
  | IConnectionStartAction
  | IConnectionCloseAction
  | IGetMessageAction
  | ISendMessageAction
  | IConnectionSuccessAction
  | IConnectionErrorAction
  | IConnectionClosedAction
;


export const wsConnectionStart = () => {
  return {
    type: WS_CONNECTION_START
  };
};

export const wsConnectionClose = () => {
  return {
    type: WS_CONNECTION_CLOSE
  };
};


export const wsGetMessage = (message: TOrders) => {
  return {
    type: WS_GET_MESSAGE,
    payload: message
  };
};

export const wsSendMessage = (message: TOrders) => {
  return {
    type: WS_SEND_MESSAGE,
    payload: message
  };
};


export const wsConnectionSuccess = () => {
  return {
    type: WS_CONNECTION_SUCCESS
  };
};

export const wsConnectionError = () => {
  return {
    type: WS_CONNECTION_ERROR
  };
};

export const wsConnectionClosed = () => {
  return {
    type: WS_CONNECTION_CLOSED
  };
};

