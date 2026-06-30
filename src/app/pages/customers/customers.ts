import { Component } from '@angular/core';
import { CustomerTable } from './customer-table/customer-table';

@Component({
  selector: 'app-customers',
  imports: [CustomerTable],
  templateUrl: './customers.html',
  styleUrl: './customers.scss',
})
export class Customers {}
