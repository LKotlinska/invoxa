import { Database } from './supabase';

export type Invoice = Database['public']['Tables']['invoices']['Row'];

export type InvoiceTableData = Pick<Invoice, 'id' | 'invoice_number' | 'due_date' | 'status'> & {
  customers: string;
};

export type Customer = Database['public']['Tables']['customers']['Row'];

export type CustomerTableData = Omit<Customer, 'county' | 'created_at'>;

export type CustomerOption = Pick<Customer, 'id' | 'email'>;

export type CustomerAddress = Pick<
  Customer,
  'full_name' | 'street_name' | 'postal_code' | 'city' | 'country'
>;

export type Product = Database['public']['Tables']['products']['Row'];

export type ProductTableData = Database['public']['Tables']['products']['Row'];

export type PaymentMethod = Database['public']['Enums']['payment_method_type'];

export const paymentMethodTypes: PaymentMethod[] = ['bank_transfer', 'card', 'swish'];
