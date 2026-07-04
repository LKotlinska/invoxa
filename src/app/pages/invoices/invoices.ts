import { Component, inject, signal } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { InvoiceTableData } from '../../../types/types';
import { DataTable } from '../../shared/data-table/data-table';

@Component({
  selector: 'app-invoices',
  imports: [DataTable],
  templateUrl: './invoices.html',
  styleUrl: './invoices.scss',
})
export class Invoices {
  invoices = signal<InvoiceTableData[]>([]);
  displayedColumns = signal<(keyof InvoiceTableData)[]>([
    'invoice_number',
    'customers',
    'status',
    'due_date',
  ]);

  invoiceService = inject(InvoiceService);

  ngOnInit(): void {
    this.invoiceService.getInvoices().subscribe((invoices) => {
      this.invoices.set(invoices);
    });
  }
}
