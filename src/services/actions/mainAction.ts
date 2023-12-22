import {
  LOAD_INGREDIENTS,
  LOAD_DETAILS,
  DELETE_DETAILS,
  ORDER_NUMBER,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  CHANGE_INGREDIENT,
  ORDER_CLEAR,
 } from './index';

import  {baseUrl , checkReponse}  from '../../utils/urlConst';
import { getCookie } from './authActions';
import { TItem,AppDispatch  } from '../../utils/types';
const contentURL = new URL('ingredients', baseUrl );
const orderURL = new URL('orders', baseUrl );


export function getData() {
  return function (dispatch: AppDispatch) {
    fetch(<any>contentURL)
      .then(checkReponse)
      .then((response) => {
          dispatch({
            type: LOAD_INGREDIENTS,
            data: response.data,
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function postOrder(data: Array<TItem>) {
  return async function (dispatch: AppDispatch) {
    const orders = data.map((item) => item._id);
    const answer = await fetch(<any>orderURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: getCookie('accessToken'),
      },
      body: JSON.stringify({
        ingredients: orders,
      }),
    })
      .then(checkReponse)
      .then((response) => {
          dispatch({
            type: ORDER_NUMBER,
            number: response.order.number,
          });
          dispatch({
            type: ORDER_CLEAR,
          });
      })
      .catch((error) => {
        console.log(error);
      });
    return answer;
  };
}

export interface ILoadDetailsAction {
  readonly type: typeof LOAD_DETAILS;
  readonly item: TItem;
}
export interface IDeleteDetailsAction {
  readonly type: typeof DELETE_DETAILS;
}
export interface IAddIngredientAction {
  readonly type: typeof ADD_INGREDIENT;
  readonly item: TItem,
  readonly id: number,
  readonly qnt: number,

}
export interface IDeleteIngredientAction {
  readonly type: typeof DELETE_INGREDIENT;
  readonly item: TItem,
  readonly qnt: number,
}
export interface IChangeingredientAction {
  readonly type: typeof CHANGE_INGREDIENT;
  readonly dragIndex: number,
  readonly hoverIndex: number,
}
export interface IGetDataAction {
  readonly type: typeof LOAD_INGREDIENTS;
  readonly data: Array<TItem>;
}
export interface IPostOrderAction {
  readonly type: typeof ORDER_NUMBER;
  readonly number: number;
}
export interface IOrderClearAction {
  readonly type: typeof ORDER_CLEAR;
}

export type TMainActions =
  | IChangeingredientAction
  | IDeleteIngredientAction
  | IAddIngredientAction
  | IDeleteDetailsAction
  | ILoadDetailsAction
  | IGetDataAction
  | IPostOrderAction
  | IOrderClearAction;
