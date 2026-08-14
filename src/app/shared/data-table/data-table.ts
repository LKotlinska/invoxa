import { Component, input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

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
