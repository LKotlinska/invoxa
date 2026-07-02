import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { from, map, Observable } from 'rxjs';
import { CustomerTableData } from '../../types/types';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  constructor(private supabaseService: SupabaseService) {}

  getCustomers(): Observable<CustomerTableData[]> {
    return from(
      this.supabaseService.client
        .from('customers')
        .select('id, full_name, email, street_name, postal_code, city, country'),
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data.map((customer) => ({
          id: customer.id,
          full_name: customer.full_name,
          email: customer.email,
          street_name: customer.street_name,
          postal_code: customer.postal_code,
          city: customer.city,
          country: customer.country,
        }));
      }),
    );
  }
}
