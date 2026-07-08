import { Component, inject, OnInit, Output, signal } from '@angular/core';
import { OutlinedInput } from '../../shared/form-fields/outlined-input/outlined-input';
import { SelectInput } from '../../shared/form-fields/select-input/select-input';

import { MatButtonModule } from '@angular/material/button';
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
import {
  FormControl,
  FormGroup,
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
  FormArray,
  Validators,
} from '@angular/forms';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { AsyncPipe } from '@angular/common';

type InvoiceRows = FormArray<InvoiceRow>;
type InvoiceRow = FormGroup<{
  id: FormControl;
  name: FormControl;
  price: FormControl;
  qty: FormControl;
}>;

@Component({
  selector: 'app-invoice-form',
  imports: [
    OutlinedInput,
    SelectInput,
    FilterAutoSelect,
    AsyncPipe,
    MatButtonModule,
    ɵInternalFormsSharedModule,
    ReactiveFormsModule,
  ],
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

  controlEmail = new FormControl('', [Validators.email, Validators.required]);
  controlDate = new FormControl('', Validators.required);
  controlDueDate = new FormControl('', Validators.required);
  controlPayment = new FormControl('', Validators.required);
  controlFullName = new FormControl('', Validators.required);
  controlStreetName = new FormControl('', Validators.required);
  controlPostalCode = new FormControl('', Validators.required);
  controlCity = new FormControl('', Validators.required);
  controlCountry = new FormControl('', Validators.required);

  itemCost$!: Observable<number>;
  productGroups = new FormArray<InvoiceRow>([]);

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

  private createRow(): InvoiceRow {
    const group = new FormGroup({
      id: new FormControl(),
      name: new FormControl(),
      price: new FormControl(),
      qty: new FormControl(),
    });
    group.controls.id.disable();
    return group;
  }

  constructor() {
    this.addRow(); // start with one row
  }

  addRow(): void {
    this.productGroups.push(this.createRow());
  }

  removeRow(index: number): void {
    this.productGroups.removeAt(index);
  }

  get rows(): InvoiceRow[] {
    return this.productGroups.controls;
  }

  onProductSelected(product: Product, row: FormGroup): void {
    this.productService.getProductById(product.id).subscribe((value) => {
      row.patchValue({
        id: value.id,
        name: value.product_name,
        price: value.price,
      });
    });
  }

  rowCost$(row: FormGroup): Observable<number> {
    return combineLatest([
      row.get('price')!.valueChanges.pipe(startWith(row.get('price')!.value)),
      row.get('qty')!.valueChanges.pipe(startWith(row.get('qty')!.value)),
    ]).pipe(map(([price, qty]) => Number(price) * Number(qty)));
  }

  onSubmit(event: Event) {
    event.preventDefault();
    console.log('Submit works');
  }
}
