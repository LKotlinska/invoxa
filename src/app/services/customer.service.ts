import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { from, map, Observable } from 'rxjs';
import { CustomerTableData } from '../../types/types';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  constructor(private supabaseService: SupabaseService) {}

  getCustomers(): Observable<CustomerTableData[]> {
    return from(this.supabaseService.client.from('customers').select('id, name, email')).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data.map((customer) => ({
          id: customer.id,
          email: customer.email,
          name: customer.name,
        }));
      }),
    );
  }
}
