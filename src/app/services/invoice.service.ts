import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { InvoiceTableData } from '../../types/types';

@Injectable({ providedIn: 'root' })
export class InvoiceService {
  constructor(private supabaseService: SupabaseService) {}

  getInvoices(): Observable<InvoiceTableData[]> {
    return from(
      this.supabaseService.client
        .from('invoices')
        .select('id, invoice_number, due_date, status, customers(name)'),
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data.map((invoice) => ({
          id: invoice.id,
          invoice_number: invoice.invoice_number,
          due_date: invoice.due_date,
          status: invoice.status,
          customers: invoice.customers?.name ?? '',
        }));
      }),
    );
  }
}
