import { AsyncPipe } from '@angular/common';
import { Component, input, Signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Product } from '../../../types/types';

@Component({
  selector: 'app-data-table',
  imports: [MatTableModule],
  templateUrl: './data-table.html',
  styleUrl: './data-table.scss',
})
export class DataTable {
  displayedColumns = input<string[]>();
  items = input<unknown[]>();
}
