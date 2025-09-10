import { ActionReducerMap } from '@ngrx/store';
import { userReducer, orderReducer } from './user.reducer';
import { UserState, OrderState } from './user.state';

export interface AppState {
  users: UserState;
  orders: OrderState;
}

export const reducers: ActionReducerMap<AppState> = {
  users: userReducer,
  orders: orderReducer,
};

