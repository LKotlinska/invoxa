import { Component, inject, signal, Signal } from '@angular/core';
import { CustomerTableData } from '../../../types/types';
import { CustomerService } from '../../services/customer.service';
import { DataTable } from '../../shared/data-table/data-table';

@Component({
  selector: 'app-customers',
  imports: [DataTable],
  templateUrl: './customers.html',
  styleUrl: './customers.scss',
})
export class Customers {
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
