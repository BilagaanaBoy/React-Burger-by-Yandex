import { ORDER_NUMBER } from '../actions/orderAction';

const initialState = {
  ingredients: [],
  constructor: [],
  ingredient: null,
  order: null,
};

export const reducerOrder = (state = initialState, action) => {
  switch (action.type) {

    case ORDER_NUMBER:
      return {
        ...state,
        order: action.number,
      };
      
    default:
      return state;
  }
};