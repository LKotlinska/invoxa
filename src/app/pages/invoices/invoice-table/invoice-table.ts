import { Component, inject, signal } from '@angular/core';
import { DataTable } from '../../../shared/data-table/data-table';
import { InvoiceTableData } from '../../../../types/types';
import { InvoiceService } from '../../../services/invoice.service';

@Component({
  selector: 'app-invoice-table',
  imports: [DataTable],
  templateUrl: './invoice-table.html',
  styleUrl: './invoice-table.scss',
})
export class InvoiceTable {
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
