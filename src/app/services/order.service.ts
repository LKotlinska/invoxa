import { inject, Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { from, map, Observable } from 'rxjs';
import { OrderTableData } from '../../types/types';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  supabaseService = inject(SupabaseService);
  getOrders(): Observable<OrderTableData[]> {
    return from(
      this.supabaseService.client.from('orders').select('*, products(product_name)'),
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data.map((order) => ({
          id: order.id,
          invoice_id: order.invoice_id,
          product_id: order.product_id,
          product_name: order.products.product_name,
          price: order.price,
          quantity: order.quantity,
        }));
      }),
    );
  }
}
