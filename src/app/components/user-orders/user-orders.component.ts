import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { 
  selectAllUsers, 
  selectSelectedUserId, 
  selectUserWithOrdersSummary,
  selectUserLoading,
  selectOrderLoading,
  selectUserError
} from '../../store/user.selectors';
import { setSelectedUserId, loadUsers } from '../../store/user.actions';
import { UserNameComponent } from '../user-name/user-name.component';
import { UserOrdersAmountComponent } from '../user-orders-amount/user-orders-amount.component';

@Component({
  selector: 'app-user-orders',
  standalone: true,
  imports: [CommonModule, UserNameComponent, UserOrdersAmountComponent],
  templateUrl: './user-orders.component.html',
  styleUrl: './user-orders.component.scss'
})
export class UserOrdersComponent implements OnInit {
  users$: Observable<User[]>;
  selectedUserId$: Observable<number | null>;
  userWithOrdersSummary$: Observable<any>;
  userLoading$: Observable<boolean>;
  orderLoading$: Observable<boolean>;
  userError$: Observable<string | null>;

  constructor(private store: Store) {
    this.users$ = this.store.select(selectAllUsers);
    this.selectedUserId$ = this.store.select(selectSelectedUserId);
    this.userWithOrdersSummary$ = this.store.select(selectUserWithOrdersSummary);
    this.userLoading$ = this.store.select(selectUserLoading);
    this.orderLoading$ = this.store.select(selectOrderLoading);
    this.userError$ = this.store.select(selectUserError);
  }

  ngOnInit(): void {
    // Load users when component initializes
    this.store.dispatch(loadUsers());
  }

  selectUser(userId: number): void {
    this.store.dispatch(setSelectedUserId({ userId }));
  }

  clearSelection(): void {
    this.store.dispatch(setSelectedUserId({ userId: null }));
  }
}
