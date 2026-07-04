import { inject, Injectable, OnInit } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { from, map, Observable } from 'rxjs';
import { Product } from '../../types/types';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  supabaseService = inject(SupabaseService);

  getProducts(): Observable<Product[]> {
    return from(this.supabaseService.client.from('products').select('*')).pipe(
      map(({ data, error }) => {
        if (error) throw Error;
        return data.map((product) => ({
          id: product.id,
          price: product.price,
          product_name: product.product_name,
          sold: product.sold,
        }));
      }),
    );
  }
}
