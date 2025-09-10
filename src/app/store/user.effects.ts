import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserService } from '../services/user.service';
import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);

  // Load all users
  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.loadUsers),
      switchMap(() =>
        this.userService.getUsers().pipe(
          map(users => UserActions.loadUsersSuccess({ users })),
          catchError(error => of(UserActions.loadUsersFailure({ error: error.message })))
        )
      )
    );
  });

  // Load user by ID with switchMap to cancel previous requests
  loadUserById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.setSelectedUserId),
      switchMap(({ userId }) => {
        if (userId === null) {
          return of(UserActions.loadUserOrdersSuccess({ orders: [] }));
        }
        return this.userService.getUserOrders(userId).pipe(
          map(orders => UserActions.loadUserOrdersSuccess({ orders })),
          catchError(error => of(UserActions.loadUserOrdersFailure({ error: error.message })))
        );
      })
    );
  });

  // Load all orders
  loadOrders$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.loadOrders),
      switchMap(() =>
        this.userService.getOrders().pipe(
          map(orders => UserActions.loadOrdersSuccess({ orders })),
          catchError(error => of(UserActions.loadOrdersFailure({ error: error.message })))
        )
      )
    );
  });

  // Add user
  addUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.addUser),
      switchMap(({ user }) =>
        this.userService.addUser(user).pipe(
          map(addedUser => UserActions.addUserSuccess({ user: addedUser })),
          catchError(error => of(UserActions.addUserFailure({ error: error.message })))
        )
      )
    );
  });

  // Update user
  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.updateUser),
      switchMap(({ user }) =>
        this.userService.updateUser(user).pipe(
          map(updatedUser => UserActions.updateUserSuccess({ user: updatedUser })),
          catchError(error => of(UserActions.updateUserFailure({ error: error.message })))
        )
      )
    );
  });

  // Delete user
  deleteUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.deleteUser),
      switchMap(({ id }) =>
        this.userService.deleteUser(id).pipe(
          map(deletedId => UserActions.deleteUserSuccess({ id: deletedId })),
          catchError(error => of(UserActions.deleteUserFailure({ error: error.message })))
        )
      )
    );
  });
}
