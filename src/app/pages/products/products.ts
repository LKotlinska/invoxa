import { Component, inject, signal } from '@angular/core';
import { DataTable } from '../../shared/data-table/data-table';
import { Product } from '../../../types/types';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  imports: [DataTable],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {
  products = signal<Product[]>([]);
  displayedColumns = signal<(keyof Product)[]>(['id', 'product_name', 'price']);
  productService = inject(ProductService);

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products.set(products);
    });
  }
}
