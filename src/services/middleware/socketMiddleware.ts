import type { Middleware, MiddlewareAPI } from 'redux';

import type { AppDispatch, RootState } from '../../utils/types';
import type { TWSActions } from '../actions/wsActions';


export const socketMiddleware = (wsActions:  any): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

    return next => (action: TWSActions) => {
      const { dispatch } = store;
      const { type, payload} = action;
      const { wsInit, wsClose, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
 
      if (type === wsInit) {
        socket = new WebSocket(payload);
      }
      if (type === wsClose) {
        socket?.close();
      }
      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          dispatch({ type: onMessage, payload: JSON.parse(data) });
        };

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };

        if (type === wsSendMessage) {
          const message = payload;
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
    }) as Middleware;
};