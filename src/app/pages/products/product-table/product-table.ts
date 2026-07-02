import { Component, OnInit, signal } from '@angular/core';
import { Product } from '../../../../types/types';
import { ProductService } from '../../../services/product.service';
import { Observable } from 'rxjs';
import { SupabaseService } from '../../../services/supabase.service';
import { AsyncPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
@Component({
  selector: 'app-product-table',
  imports: [AsyncPipe, MatTableModule],
  templateUrl: './product-table.html',
  styleUrl: './product-table.scss',
})
export class ProductTable implements OnInit {
  products$!: Observable<Product[]>;
  displayedColumns = signal<(keyof Product)[]>(['id', 'product_name', 'price']);
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products$ = this.productService.getProducts();
  }
}
