import { Component, inject, signal } from '@angular/core';
import { CustomerTableData } from '../../../../types/types';
import { CustomerService } from '../../../services/customer.service';
import { DataTable } from '../../../shared/data-table/data-table';

@Component({
  selector: 'app-customer-table',
  imports: [DataTable],
  templateUrl: './customer-table.html',
  styleUrl: './customer-table.scss',
})
export class CustomerTable {
  customers = signal<CustomerTableData[]>([]);
  displayedColumns = signal<(keyof CustomerTableData)[]>([
    'id',
    'full_name',
    'email',
    'street_name',
    'postal_code',
    'city',
    'country',
  ]);

  customerService = inject(CustomerService);

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe((customers) => {
      this.customers.set(customers);
    });
  }
}
