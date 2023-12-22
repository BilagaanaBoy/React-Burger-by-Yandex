import {
  LOAD_INGREDIENTS,
  ADD_INGREDIENT,
  CHANGE_INGREDIENT,
  DELETE_INGREDIENT,

  LOAD_DETAILS,
  DELETE_DETAILS,

  ORDER_NUMBER,
  ORDER_CLEAR,
} from '../actions';

import { TMainActions } from '../actions/mainAction';
import { TItem } from '../../utils/types';

type TinitialState = {
  ingredients: Array<TItem>;
  constructor: Array<TItem>;
  ingredient: TItem | {};
  order: number;
};

const initialState:TinitialState = {
  ingredients: [],
  constructor: [],
  ingredient: {},
  order: 0,
};

export const mainReducer = (state = initialState, action:TMainActions):TinitialState => {
  switch (action.type) {

    case LOAD_INGREDIENTS:
      return {
        ...state,
        ingredients: action.data.map((element) => {
          element['count'] = 0;
          return element;
        }),
      };

    case ADD_INGREDIENT:
      return {
        ...state,
        constructor: [
          ...state.constructor,
          { ...action.item, uniqueId: action.id },
        ],
        ingredients: [...state.ingredients].map((item) =>
          item._id === action.item._id
            ? { ...item, count: item.count + action.qnt }
            : item
        ),
      };

    case CHANGE_INGREDIENT:
      const rebuildConstructor = [...state.constructor];
      const dragIndex = rebuildConstructor[action.dragIndex];
      rebuildConstructor.splice(action.dragIndex, 1);
      rebuildConstructor.splice(action.hoverIndex, 0, dragIndex);
      return {
        ...state,
        constructor: rebuildConstructor,
      };

    case DELETE_INGREDIENT:
      return {
        ...state,
        constructor: [...state.constructor].filter((item) => item.uniqueId !== action.item.uniqueId),
        ingredients: [...state.ingredients].map((item) => item._id === action.item._id
          ? { ...item, count: item.count - action.qnt }
          : item
        ),
      };


    case LOAD_DETAILS:
      return {
        ...state,
        ingredient: action.item,
      };

    case DELETE_DETAILS:
      return {
        ...state,
        ingredient: {},
        order: 0,
      };



    case ORDER_NUMBER:
      return {
        ...state,
        order: action.number,
      };

    case ORDER_CLEAR:
      return {
        ...state,
        constructor: [],
        ingredients: [...state.ingredients].map((item) => {
          item['count'] = 0;
          return item;
        }),
      };


    default:
      return state;
  }
};