import { Data } from '@angular/router';
import { Database } from './supabase';

export type Invoice = Database['public']['Tables']['invoices']['Row'];

export type InvoiceTableData = Pick<Invoice, 'id' | 'invoice_number' | 'due_date' | 'status'> & {
  customers: string;
};

export type Customer = Database['public']['Tables']['customers']['Row'];

export type CustomerTableData = Omit<Customer, 'county' | 'created_at'>;

export type Product = Database['public']['Tables']['products']['Row'];

export type Order = Database['public']['Tables']['orders']['Row'];

export type OrderTableData = Omit<Order, 'product_id'> & { product_name: string };
