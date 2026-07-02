import { Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import { OrderTableData } from '../../types/types';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private supabaseService: SupabaseService) {}
  getOrders(): Observable<OrderTableData[]> {
    return from(
      this.supabaseService.client.from('orders').select('*, products(product_name)'),
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data.map((order) => ({
          id: order.id,
          invoice_id: order.invoice_id,
          product_name: order.products?.product_name ?? '',
          price: order.price,
          quantity: order.quantity || 0,
        }));
      }),
    );
  }
}
