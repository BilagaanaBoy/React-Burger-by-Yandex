import { combineReducers } from 'redux';
import { mainReducer } from './mainReducer';
import { authReducer } from './authReducers';

export const rootReducer = combineReducers({
    mainReducer,
    authReducer,
});