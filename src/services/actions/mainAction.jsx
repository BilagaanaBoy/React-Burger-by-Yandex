import { createStore, applyMiddleware } from 'redux';
import { LOAD_INGREDIENTS } from './loadAction';
import { ORDER_NUMBER, ORDER_CLEAR } from './orderAction';
import checkResponse from '../../utils/checkResponse';

import  baseUrl  from '../../utils/urlConst.js';

const thunkMiddleware = require('redux-thunk').default

const contentURL = baseUrl + "ingredients";
const orderURL = baseUrl + "orders";

const initialState = {
  loading: false,
  data: [],
  error: ''
}

const _REQUESTED = '_REQUESTED'
const _SUCCEEDED = '_SUCCEEDED'
const _FAILED = '_FAILED'

const fetchRequest = () => {
  return {
    type: _REQUESTED
  }
}

const fetchSuccess = data => {
  return {
    type: _SUCCEEDED,
    payload: data
  }
}

const fetchFailure = error => {
  return {
    type: _FAILED,
    payload: error
  }
}

export function getData() {
  return function (dispatch) {
    dispatch(fetchRequest())
    fetch(contentURL)
      .then(checkResponse)
      .then((response) => {
          dispatch({
            type: LOAD_INGREDIENTS,
            data: response.data,
          });
          dispatch(fetchSuccess(response.data))
      })
      .catch((error) => {
        console.log(error);
        dispatch(fetchFailure(error.message))
      });
  };
}

export function postOrder(data) {
  return async function (dispatch) {
    dispatch(fetchRequest())
    const res = await fetch(orderURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        ingredients: data,
      }),
    })
      .then(checkResponse)
      .then((response) => {
          dispatch({
            type: ORDER_NUMBER,
            number: response.order.number,
          });
          dispatch({
            type: ORDER_CLEAR,
          });
      dispatch(fetchSuccess(response.data))
      })
      .catch((error) => {
        console.log(error);
        dispatch(fetchFailure(error.message))
      }); 

    return res;
  };
}

const reducer = (state = initialState, action) => {
  console.log(action.type)
  switch (action.type) {
    case _REQUESTED:
      return {
        ...state,
        loading: true
      }
    case _SUCCEEDED:
      return {
        loading: false,
        data: action.payload,
        error: ''
      }
    case _FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload
      }
  }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware))
store.subscribe(() => {
  console.log(store.getState())
})
