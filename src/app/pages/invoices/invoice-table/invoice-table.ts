import { Component, OnInit, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { InvoiceService } from '../../../services/invoice.service';
import { InvoiceTableData } from '../../../../types/types';
import { AsyncPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-invoice-table',
  imports: [AsyncPipe, MatTableModule],
  templateUrl: './invoice-table.html',
  styleUrl: './invoice-table.scss',
})
export class InvoiceTable implements OnInit {
  invoices$!: Observable<InvoiceTableData[]>;
  displayedColumns = signal<(keyof InvoiceTableData)[]>([
    'invoice_number',
    'customers',
    'status',
    'due_date',
  ]);

  constructor(private invoiceService: InvoiceService) {}

  ngOnInit(): void {
    this.invoices$ = this.invoiceService.getInvoices();
  }
}
