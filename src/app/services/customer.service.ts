import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { from, map, Observable } from 'rxjs';
import { CustomerAddress, CustomerOption, CustomerTableData } from '../../types/types';

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

  getCustomerOptions(): Observable<CustomerOption[]> {
    return from(this.supabaseService.client.from('customers').select('id, email')).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data;
      }),
    );
  }

  getCustomerById(customerId: number): Observable<CustomerAddress> {
    return from(
      this.supabaseService.client.from('customers').select('*').eq('id', customerId).single(),
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return {
          full_name: data.full_name,
          street_name: data.street_name,
          postal_code: data.postal_code,
          city: data.city,
          country: data.country,
        };
      }),
    );
  }
}
