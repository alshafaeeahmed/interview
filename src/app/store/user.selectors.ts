import { createFeatureSelector, createSelector } from '@ngrx/store';
import { userAdapter } from './user.state';
import { orderAdapter } from './user.state';
import { UserState, OrderState } from './user.state';
import { User, Order } from '../models/user.model';

// Feature selectors
export const selectUserState = createFeatureSelector<UserState>('users');
export const selectOrderState = createFeatureSelector<OrderState>('orders');

// User selectors
export const {
  selectAll: selectAllUsers,
  selectEntities: selectUserEntities,
  selectIds: selectUserIds,
  selectTotal: selectUserTotal,
} = userAdapter.getSelectors(selectUserState);

export const selectSelectedUserId = createSelector(
  selectUserState,
  (state: UserState) => state.selectedUserId
);

export const selectSelectedUser = createSelector(
  selectUserEntities,
  selectSelectedUserId,
  (userEntities, selectedUserId) => {
    if (selectedUserId === null) {
      return null;
    }
    return userEntities[selectedUserId] || null;
  }
);

export const selectUserLoading = createSelector(
  selectUserState,
  (state: UserState) => state.loading
);

export const selectUserError = createSelector(
  selectUserState,
  (state: UserState) => state.error
);

// Order selectors
export const {
  selectAll: selectAllOrders,
  selectEntities: selectOrderEntities,
  selectIds: selectOrderIds,
  selectTotal: selectOrderTotal,
} = orderAdapter.getSelectors(selectOrderState);

export const selectOrdersBySelectedUser = createSelector(
  selectAllOrders,
  selectSelectedUserId,
  (orders: Order[], selectedUserId: number | null) => {
    if (selectedUserId === null) {
      return [];
    }
    return orders.filter(order => order.userId === selectedUserId);
  }
);

export const selectOrderLoading = createSelector(
  selectOrderState,
  (state: OrderState) => state.loading
);

export const selectOrderError = createSelector(
  selectOrderState,
  (state: OrderState) => state.error
);

// Combined selectors
export const selectUserWithOrdersSummary = createSelector(
  selectSelectedUser,
  selectOrdersBySelectedUser,
  (user: User | null, orders: Order[]) => {
    if (!user) {
      return null;
    }
    
    const totalAmount = orders.reduce((sum, order) => sum + order.total, 0);
    
    return {
      name: user.name,
      totalAmount: totalAmount,
      orderCount: orders.length
    };
  }
);

export const selectUserOrdersTotal = createSelector(
  selectOrdersBySelectedUser,
  (orders: Order[]) => orders.reduce((sum, order) => sum + order.total, 0)
);

