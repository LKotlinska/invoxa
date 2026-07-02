import { AsyncPipe } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerTableData } from '../../../../types/types';
import { CustomerService } from '../../../services/customer.service';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-customer-table',
  imports: [AsyncPipe, MatTableModule],
  templateUrl: './customer-table.html',
  styleUrl: './customer-table.scss',
})
export class CustomerTable implements OnInit {
  customers$!: Observable<CustomerTableData[]>;
  displayedColumns = signal<(keyof CustomerTableData)[]>([
    'id',
    'full_name',
    'email',
    'street_name',
    'postal_code',
    'city',
    'country',
  ]);

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customers$ = this.customerService.getCustomers();
  }
}
