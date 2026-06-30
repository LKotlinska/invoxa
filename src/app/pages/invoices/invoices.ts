import { Component } from '@angular/core';
import { InvoiceTable } from './invoice-table/invoice-table';

@Component({
  selector: 'app-invoices',
  imports: [InvoiceTable],
  templateUrl: './invoices.html',
  styleUrl: './invoices.scss',
})
export class Invoices {}
