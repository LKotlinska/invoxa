import { Component, inject, signal } from '@angular/core';
import { OrderTableData } from '../../../types/types';
import { OrderService } from '../../services/order.service';
import { DataTable } from '../../shared/data-table/data-table';

@Component({
  selector: 'app-orders',
  imports: [DataTable],
  templateUrl: './orders.html',
  styleUrl: './orders.scss',
})
export class Orders {
  orders = signal<OrderTableData[]>([]);
  displayedColumns = <(keyof OrderTableData)[]>[
    'id',
    'invoice_id',
    'product_name',
    'price',
    'quantity',
  ];
  orderService = inject(OrderService);

  ngOnInit(): void {
    this.orderService.getOrders().subscribe((orders) => {
      this.orders.set(orders);
    });
  }
}
