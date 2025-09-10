import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-orders-amount',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-orders-amount.component.html',
  styleUrl: './user-orders-amount.component.scss'
})
export class UserOrdersAmountComponent {
  @Input() totalAmount!: number;
  @Input() orderCount!: number;
}