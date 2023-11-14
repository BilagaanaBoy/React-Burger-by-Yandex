import { LOAD_INGREDIENTS } from './loadAction';
import { LOAD_INGREDIENTS_REQIEST, LOAD_INGREDIENTS_SUCCESS, LOAD_INGREDIENTS_FAILED } from './loadAction';

import checkResponse from '../../utils/checkResponse';

import  baseUrl  from '../../utils/urlConst.js';
const contentURL = baseUrl + "ingredients";


export function getData() {
  return function (dispatch) {

    dispatch({
      type: LOAD_INGREDIENTS_REQIEST
    })
    
    fetch(contentURL)
      .then(checkResponse)
      .then((response) => {
        dispatch({
            type: LOAD_INGREDIENTS_SUCCESS,
            payload: response.success,
        })

        if(response.success){
          dispatch({
            type: LOAD_INGREDIENTS,
            data: response.data,
          });
        }
        
      })
      .catch((error) => {

        dispatch({
          type: LOAD_INGREDIENTS_FAILED,
          payload: error,
        });

      });
  };
}


