import { AsyncPipe } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerTableData } from '../../../../types/types';

@Component({
  selector: 'app-customer-table',
  imports: [AsyncPipe],
  templateUrl: './customer-table.html',
  styleUrl: './customer-table.scss',
})
export class CustomerTable implements OnInit {
  customers$!: Observable<CustomerTableData[]>;
  displayedColumns = signal<(keyof CustomerTableData)[]>(['id', 'name', 'email']);

  ngOnInit(): void {}
}
