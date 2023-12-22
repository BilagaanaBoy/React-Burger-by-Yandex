export type TItem = {
    _id: string;
    name: string;
    type: "bun" | "main" | "sauce";
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    uniqueId?: number;
      index?: number;
      count: number;
  }
  
  export type TUserData = {
    email: string,
    password: string,
    name?: string,
  }
  
  export type TOrderRow = {
    ingredients: Array<string>,
    _id: string,
    status: 'created' | 'done' | 'pending',
    number: number,
    createdAt: string,
    updatedAt: string,
    name: string,
  }
  export type TOrders = {
    success: boolean,
    orders: Array<TOrderRow>,
    total: number,
    totalToday: number,
  }
  
  
import { store } from '../index';
import { TAuthActions } from '../services/actions/authActions';
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { TMainActions } from '../services/actions/mainAction';
import { TWSActions } from '../services/actions/wsActions';

export type RootState = ReturnType<typeof store.getState>;

export type TApplicationActions = TAuthActions | TMainActions | TWSActions;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
  >;

export type AppThunkAction<TReturn = void> = ThunkAction<TReturn, Action, RootState, TApplicationActions>; 

export type AppDispatch = typeof store.dispatch;



