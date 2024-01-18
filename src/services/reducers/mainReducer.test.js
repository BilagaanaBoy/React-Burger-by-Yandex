import { mainReducer } from './mainReducer';
import * as types from '../actions';
import { ingredientsArray,ingredientsArrayCount,ingredientsArrayChange } from '../../utils/testConsts';

describe('main reducer', () => {
  it('should return the initial state', () => {
    expect(mainReducer(undefined, {})).toEqual({
      ingredients: [],
      constructor: [],
      ingredient: {},
      order: 0,
    });
  });

  it('should handle LOAD_INGREDIENTS', () => {
    expect(
      mainReducer(
        {
          ingredients: [],
          constructor: [],
          ingredient: {},
          order: 0,
        },
        {
          type: types.LOAD_INGREDIENTS,
          data: ingredientsArray,
        }
      )
    ).toEqual({
      ingredients: ingredientsArrayCount,
      constructor: [],
      ingredient: {},
      order: 0,
    });

    expect(
      mainReducer(
        {
          ingredients: ingredientsArrayCount,
          constructor: [],
          ingredient: {},
          order: 0,
        },
        {
          type: types.LOAD_INGREDIENTS,
          data: ingredientsArray,
        }
      )
    ).toEqual({
      ingredients: ingredientsArrayCount,
      constructor: [],
      ingredient: {},
      order: 0,
    });
  });

  it('should handle LOAD_DETAILS', () => {
    expect(
      mainReducer(
        {
          ingredients: [],
          constructor: [],
          ingredient: {},
          order: 0,
        },
        {
          type: types.LOAD_DETAILS,
          item: ingredientsArrayCount[0],
        }
      )
    ).toEqual({
      ingredients: [],
      constructor: [],
      ingredient: ingredientsArrayCount[0],
      order: 0,
    });

    expect(
      mainReducer(
        {
          ingredients: ingredientsArrayCount,
          constructor: [],
          ingredient: ingredientsArrayCount[0],
          order: 0,
        },
        {
          type: types.LOAD_DETAILS,
          item: ingredientsArrayCount[1],
        }
      )
    ).toEqual({
      ingredients: ingredientsArrayCount,
      constructor: [],
      ingredient: ingredientsArrayCount[1],
      order: 0,
    });
  });

  it('should handle DELETE_DETAILS', () => {
    expect(
      mainReducer(
        {
          ingredients: [],
          constructor: [],
          ingredient: {},
          order: 0,
        },
        {
          type: types.DELETE_DETAILS,
        }
      )
    ).toEqual({
      ingredients: [],
      constructor: [],
      ingredient: {},
      order: 0,
    });

    expect(
      mainReducer(
        {
          ingredients: ingredientsArrayCount,
          constructor: [],
          ingredient: ingredientsArrayCount[0],
          order: 5674,
        },
        {
          type: types.DELETE_DETAILS,
        }
      )
    ).toEqual({
      ingredients: ingredientsArrayCount,
      constructor: [],
      ingredient: {},
      order: 0,
    });
  });

  it('should handle ORDER_NUMBER', () => {
    expect(
      mainReducer(
        {
          ingredients: [],
          constructor: [],
          ingredient: {},
          order: 0,
        },
        {
          type: types.ORDER_NUMBER,
          number: 3489,
        }
      )
    ).toEqual({
      ingredients: [],
      constructor: [],
      ingredient: {},
      order: 3489,
    });

    expect(
      mainReducer(
        {
          ingredients: ingredientsArrayCount,
          constructor: [],
          ingredient: ingredientsArrayCount[0],
          order: 5674,
        },
        {
          type: types.ORDER_NUMBER,
          number: 3489,
        }
      )
    ).toEqual({
      ingredients: ingredientsArrayCount,
      constructor: [],
      ingredient: ingredientsArrayCount[0],
      order: 3489,
    });
  });

  it('should handle ADD_INGREDIENT', () => {
    ingredientsArrayChange[0].count = 1;
    expect(
      mainReducer(
        {
          ingredients: ingredientsArrayCount,
          constructor: [],
          ingredient: {},
          order: 0,
        },
        {
          type: types.ADD_INGREDIENT,
          item: ingredientsArrayCount[0],
          id: ingredientsArrayCount[0]._id,
          qnt: 1,
        }
      )
    ).toEqual({
      ingredients: ingredientsArrayChange,
      constructor: [
        {
          ...ingredientsArrayCount[0],
          uniqueId: ingredientsArrayCount[0]._id,
        },
      ],
      ingredient: {},
      order: 0,
    });

    ingredientsArrayChange[1].count = 2;
    ingredientsArrayCount[0].count = 1;
    expect(
      mainReducer(
        {
          ingredients: ingredientsArrayCount,
          constructor: [
            {
              ...ingredientsArrayCount[0],
              uniqueId: ingredientsArrayCount[0]._id,
            },
          ],
          ingredient: {},
          order: 0,
        },
        {
          type: types.ADD_INGREDIENT,
          item: ingredientsArrayCount[1],
          id: ingredientsArrayCount[1]._id,
          qnt: 2,
        }
      )
    ).toEqual({
      ingredients: ingredientsArrayChange,
      constructor: [
        {
          ...ingredientsArrayCount[0],
          uniqueId: ingredientsArrayCount[0]._id,
        },
        {
          ...ingredientsArrayCount[1],
          uniqueId: ingredientsArrayCount[1]._id,
        },
      ],
      ingredient: {},
      order: 0,
    });
  });

  it('should handle DELETE_INGREDIENT', () => {
    ingredientsArrayCount[1].count = 2;
    ingredientsArrayChange[1].count = 0;
    const itemForDelete = {
      ...ingredientsArrayCount[1],
      uniqueId: 1637997988671,
    };
    expect(
      mainReducer(
        {
          ingredients: ingredientsArrayCount,
          constructor: [
            {
              ...ingredientsArrayCount[0],
              uniqueId: 1637997988670,
            },
            {
              ...ingredientsArrayCount[1],
              uniqueId: 1637997988671,
            },
          ],
          ingredient: {},
          order: 0,
        },
        {
          type: types.DELETE_INGREDIENT,
          item: itemForDelete,
          id: ingredientsArrayCount[1]._id,
          qnt: 2,
        }
      )
    ).toEqual({
      ingredients: ingredientsArrayChange,
      constructor: [
        {
          ...ingredientsArrayCount[0],
          uniqueId: 1637997988670,
        },
      ],
      ingredient: {},
      order: 0,
    });
  });

  it('should handle CHANGE_INGREDIENT', () => {
    expect(
      mainReducer(
        {
          ingredients: ingredientsArrayCount,
          constructor: [
            {
              ...ingredientsArrayCount[0],
              uniqueId: 1637997988670,
            },
            {
              ...ingredientsArrayCount[1],
              uniqueId: 1637997988671,
            },
            {
              ...ingredientsArrayCount[2],
              uniqueId: 1637997988672,
            },
          ],
          ingredient: {},
          order: 0,
        },
        {
          type: types.CHANGE_INGREDIENT,
          dragIndex: 0,
          hoverIndex: 1,
        }
      )
    ).toEqual({
      ingredients: ingredientsArrayCount,
      constructor: [
        {
          ...ingredientsArrayCount[1],
          uniqueId: 1637997988671,
        },
        {
          ...ingredientsArrayCount[0],
          uniqueId: 1637997988670,
        },
        {
          ...ingredientsArrayCount[2],
          uniqueId: 1637997988672,
        },
      ],
      ingredient: {},
      order: 0,
    });
  });

  it('should handle ORDER_CLEAR', () => {
    ingredientsArrayChange[0].count = 0;
    ingredientsArrayChange[1].count = 0;
    ingredientsArrayCount[0].count = 1;
    ingredientsArrayCount[1].count = 1;
    expect(
      mainReducer(
        {
          ingredients: ingredientsArrayCount,
          constructor: [
            {
              ...ingredientsArrayCount[0],
              uniqueId: 1637997988670,
            },
            {
              ...ingredientsArrayCount[1],
              uniqueId: 1637997988671,
            },
          ],
          ingredient: {},
          order: 0,
        },
        {
          type: types.ORDER_CLEAR,
        }
      )
    ).toEqual({
      ingredients: ingredientsArrayChange,
      constructor: [],
      ingredient: {},
      order: 0,
    });
  });
});