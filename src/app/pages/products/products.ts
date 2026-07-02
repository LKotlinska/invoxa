import { Component } from '@angular/core';
import { ProductTable } from './product-table/product-table';

@Component({
  selector: 'app-products',
  imports: [ProductTable],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {}
