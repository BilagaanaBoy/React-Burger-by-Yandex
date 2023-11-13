import { combineReducers } from 'redux';

import { reducerOrder } from './reducerOrder';
import { reducerDetails } from './reducerDetails';
import { reducerIngredients } from './reducerIngredients';

export const rootReducer = combineReducers({
    reducerOrder,
    reducerDetails,
    reducerIngredients
});

