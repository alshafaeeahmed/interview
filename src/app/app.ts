import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UserOrdersComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('interview');
}
