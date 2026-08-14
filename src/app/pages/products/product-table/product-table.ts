import { Component, inject, signal } from '@angular/core';
import { Product } from '../../../../types/types';
import { ProductService } from '../../../services/product.service';
import { DataTable } from '../../../shared/data-table/data-table';

@Component({
  selector: 'app-product-table',
  imports: [DataTable],
  templateUrl: './product-table.html',
  styleUrl: './product-table.scss',
})
export class ProductTable {
  products = signal<Product[]>([]);
  displayedColumns = signal<(keyof Product)[]>(['id', 'product_name', 'price']);
  productService = inject(ProductService);

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products.set(products);
    });
  }
}
