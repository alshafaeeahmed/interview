import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { User, Order } from '../models/user.model';

export interface UserState extends EntityState<User> {
  selectedUserId: number | null;
  loading: boolean;
  error: string | null;
}

export interface OrderState extends EntityState<Order> {
  loading: boolean;
  error: string | null;
}

export const userAdapter = createEntityAdapter<User>({
  selectId: (user: User) => user.id,
});

export const orderAdapter = createEntityAdapter<Order>({
  selectId: (order: Order) => order.id,
});

export const initialUserState: UserState = userAdapter.getInitialState({
  selectedUserId: null,
  loading: false,
  error: null,
});

export const initialOrderState: OrderState = orderAdapter.getInitialState({
  loading: false,
  error: null,
});

