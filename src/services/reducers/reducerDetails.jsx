import { LOAD_DETAILS } from '../actions/loadAction';
import { DELETE_DETAILS } from '../actions/changeAction';

const initialState = {
  ingredients: [],
  constructor: [],
  ingredient: null,
  order: null,
  payload: null,
};

export const reducerDetails = (state = initialState, action) => {
  switch (action.type) {

    case LOAD_DETAILS:
      return {
        ...state,
        ingredient: action.item,
      };

    case DELETE_DETAILS:
      return {
        ...state,
        ingredient: null,
        order: 0,
      };
      
      
    default:
      return state;
  }
};
