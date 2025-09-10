import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { User, Order } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Mock data for demonstration
  private mockUsers: User[] = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Bob Johnson' },
    { id: 4, name: 'Alice Brown' },
  ];

  private mockOrders: Order[] = [
    { id: 1, userId: 1, total: 150.50 },
    { id: 2, userId: 1, total: 75.25 },
    { id: 3, userId: 2, total: 200.00 },
    { id: 4, userId: 2, total: 125.75 },
    { id: 5, userId: 3, total: 300.00 },
    { id: 6, userId: 4, total: 50.00 },
  ];

  getUsers(): Observable<User[]> {
    // Simulate API delay
    return of(this.mockUsers).pipe(delay(1000));
  }

  getUserById(id: number): Observable<User | undefined> {
    const user = this.mockUsers.find(u => u.id === id);
    return of(user).pipe(delay(500));
  }

  getOrders(): Observable<Order[]> {
    return of(this.mockOrders).pipe(delay(800));
  }

  getUserOrders(userId: number): Observable<Order[]> {
    const userOrders = this.mockOrders.filter(order => order.userId === userId);
    return of(userOrders).pipe(delay(600));
  }

  addUser(user: User): Observable<User> {
    this.mockUsers.push(user);
    return of(user).pipe(delay(500));
  }

  updateUser(user: User): Observable<User> {
    const index = this.mockUsers.findIndex(u => u.id === user.id);
    if (index !== -1) {
      this.mockUsers[index] = user;
    }
    return of(user).pipe(delay(500));
  }

  deleteUser(id: number): Observable<number> {
    this.mockUsers = this.mockUsers.filter(u => u.id !== id);
    return of(id).pipe(delay(500));
  }
}

