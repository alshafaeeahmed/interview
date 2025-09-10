import { createReducer, on } from '@ngrx/store';
import { userAdapter, initialUserState } from './user.state';
import { orderAdapter, initialOrderState } from './user.state';
import * as UserActions from './user.actions';

// User Reducer
export const userReducer = createReducer(
  initialUserState,
  on(UserActions.loadUsers, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(UserActions.loadUsersSuccess, (state, { users }) =>
    userAdapter.setAll(users, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  on(UserActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(UserActions.addUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(UserActions.addUserSuccess, (state, { user }) =>
    userAdapter.addOne(user, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  on(UserActions.addUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(UserActions.updateUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(UserActions.updateUserSuccess, (state, { user }) =>
    userAdapter.updateOne(
      { id: user.id, changes: user },
      {
        ...state,
        loading: false,
        error: null,
      }
    )
  ),
  on(UserActions.updateUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(UserActions.deleteUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(UserActions.deleteUserSuccess, (state, { id }) =>
    userAdapter.removeOne(id, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  on(UserActions.deleteUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(UserActions.setSelectedUserId, (state, { userId }) => ({
    ...state,
    selectedUserId: userId,
  }))
);

// Order Reducer
export const orderReducer = createReducer(
  initialOrderState,
  on(UserActions.loadOrders, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(UserActions.loadOrdersSuccess, (state, { orders }) =>
    orderAdapter.setAll(orders, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  on(UserActions.loadOrdersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(UserActions.loadUserOrders, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(UserActions.loadUserOrdersSuccess, (state, { orders }) =>
    orderAdapter.setAll(orders, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  on(UserActions.loadUserOrdersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

