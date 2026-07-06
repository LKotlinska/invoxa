import { Component, inject, OnInit, Output, signal } from '@angular/core';
import { OutlinedInput } from '../../shared/form-fields/outlined-input/outlined-input';
import { SelectInput } from '../../shared/form-fields/select-input/select-input';
import {
  CustomerAddress,
  CustomerOption,
  InvoiceItem,
  paymentMethodTypes,
  Product,
  ProductItem,
} from '../../../types/types';
import { ProductService } from '../../services/product.service';
import { FilterAutoSelect } from '../form-fields/filter-auto-select/filter-auto-select';
import { CustomerService } from '../../services/customer.service';
import { FormControl } from '@angular/forms';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-invoice-form',
  imports: [OutlinedInput, SelectInput, FilterAutoSelect, AsyncPipe],
  templateUrl: './invoice-form.html',
  styleUrl: './invoice-form.scss',
})
export class InvoiceForm {
  productService = inject(ProductService);
  customerService = inject(CustomerService);
  paymentMethods = paymentMethodTypes;

  products$ = this.productService.getProducts();
  selectedProduct!: ProductItem;
  displayProduct = (p: Product) => p.product_name;

  customers$: Observable<CustomerOption[]> = this.customerService.getCustomerOptions();
  selectedCustomer!: CustomerAddress;
  displayCustomer = (c: CustomerOption) => c.email;

  itemCost$!: Observable<number>;

  controlDate = new FormControl();
  controlDueDate = new FormControl();
  controlPayment = new FormControl();
  controlFullName = new FormControl();
  controlStreetName = new FormControl();
  controlPostalCode = new FormControl();
  controlCity = new FormControl();
  controlCountry = new FormControl();

  controlId = new FormControl();
  controlName = new FormControl();
  controlPrice = new FormControl();
  controlQty = new FormControl();

  onCustomerSelected(customer: CustomerOption): void {
    this.customerService.getCustomerById(customer.id).subscribe((value) => {
      this.selectedCustomer = value;

      this.controlFullName.setValue(this.selectedCustomer.full_name);
      this.controlStreetName.setValue(this.selectedCustomer.street_name);
      this.controlPostalCode.setValue(this.selectedCustomer.postal_code);
      this.controlCity.setValue(this.selectedCustomer.city);
      this.controlCountry.setValue(this.selectedCustomer.country);
    });
  }

  onProductSelected(product: Product): void {
    this.productService.getProductById(product.id).subscribe((value) => {
      this.selectedProduct = value;

      this.controlId.setValue(this.selectedProduct.id);
      this.controlId.disable();
      this.controlName.setValue(this.selectedProduct.product_name);
      this.controlPrice.setValue(this.selectedProduct.price);
    });
  }

  constructor() {
    this.itemCost$ = combineLatest([
      this.controlPrice.valueChanges.pipe(startWith(this.controlPrice.value)),
      this.controlQty.valueChanges.pipe(startWith(this.controlQty.value)),
    ]).pipe(map(([price, qty]) => Number(price) * Number(qty)));
  }
}
