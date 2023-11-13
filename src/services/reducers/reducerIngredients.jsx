import { LOAD_INGREDIENTS } from '../actions/loadAction';
import { ADD_INGREDIENT, DELETE_INGREDIENT } from '../actions/addDeleteAction';
import { CHANGE_INGREDIENT } from '../actions/changeAction';
import { ORDER_CLEAR } from '../actions/orderAction';

const initialState = {
  ingredients: [],
  constructor: [],
  ingredient: null,
  order: null,
};

export const reducerIngredients = (state = initialState, action) => {
  switch (action.type) {

    case LOAD_INGREDIENTS:
      return {
        ...state,
        ingredients: action.data.map((element) => {
          element.count = 0;
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

      case ORDER_CLEAR:
      return {
        ...state,
        constructor: [],
        ingredients: [...state.ingredients].map((item) => {
          item.count = 0;
          return item;
        }),
      };
      
    default:
      return state;
  }
};
