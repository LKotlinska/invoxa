import { Component, inject, signal } from '@angular/core';
import { OrderTableData } from '../../../../types/types';
import { OrderService } from '../../../services/order.service';
import { DataTable } from '../../../shared/data-table/data-table';

@Component({
  selector: 'app-order-table',
  imports: [DataTable],
  templateUrl: './order-table.html',
  styleUrl: './order-table.scss',
})
export class OrderTable {
  orders = signal<OrderTableData[]>([]);
  displayedColumns = signal<(keyof OrderTableData)[]>([
    'id',
    'invoice_id',
    'product_name',
    'price',
    'quantity',
  ]);
  orderService = inject(OrderService);

  ngOnInit(): void {
    this.orderService.getOrders().subscribe((orders) => {
      this.orders.set(orders);
    });
  }
}
