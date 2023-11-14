import { ORDER_NUMBER, ORDER_CLEAR } from './orderAction';
import { ORDER_REQUEST, ORDER_SUCCESS, ORDER_FAILED } from './orderAction';
import checkResponse from '../../utils/checkResponse';

import  baseUrl  from '../../utils/urlConst.js';
const orderURL = baseUrl + "orders";

export function postOrder(data) {
    return async function (dispatch) {
        dispatch({
            type: ORDER_REQUEST
        })

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
                type: ORDER_SUCCESS,
                payload: response.success,
            })
            
            if (response.success) {
                dispatch({
                    type: ORDER_NUMBER,
                    number: response.order.number,
                });
                dispatch({
                    type: ORDER_CLEAR,
                });
            }    
        })
        .catch((error) => {
            dispatch({
                type: ORDER_FAILED,
                payload: error,
            })
        }); 

        return res;
    };
}