import { Component, inject, OnInit, Output, Signal, signal } from '@angular/core';
import { OutlinedInput } from '../../../shared/form-fields/outlined-input/outlined-input';
import { SelectInput } from '../../../shared/form-fields/select-input/select-input';

import { MatButtonModule } from '@angular/material/button';
import {
  CustomerAddress,
  CustomerOption,
  PaymentMethod,
  paymentMethodTypes,
  Product,
  ProductItem,
} from '../../../../types/types';
import { ProductService } from '../../../services/product.service';
import { FilterAutoSelect } from '../../../shared/form-fields/filter-auto-select/filter-auto-select';
import { CustomerService } from '../../../services/customer.service';
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
import { SupabaseService } from '../../../services/supabase.service';

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
  supabaseService = inject(SupabaseService);
  productService = inject(ProductService);
  customerService = inject(CustomerService);
  paymentMethods = paymentMethodTypes;

  products$ = this.productService.getProducts();
  selectedProduct!: ProductItem;
  displayProduct = (p: Product) => p.product_name;

  customers$: Observable<CustomerOption[]> = this.customerService.getCustomerOptions();
  selectedCustomer!: CustomerAddress;
  displayCustomer = (c: CustomerOption) => c.email;

  invoiceForm = new FormGroup({
    controlEmail: new FormControl('', [
      // Fixes the validation against type 'email' in filter autocomplete component as it emits an object.
      (control) => (typeof control.value !== 'string' ? null : Validators.email(control)),
      Validators.required,
    ]),
    controlDate: new FormControl('', Validators.required),
    controlDueDate: new FormControl('', Validators.required),
    controlPayment: new FormControl<PaymentMethod | undefined>(undefined, {
      nonNullable: true,
      validators: Validators.required,
    }),
    controlFullName: new FormControl('', Validators.required),
    controlStreetName: new FormControl('', Validators.required),
    controlPostalCode: new FormControl('', Validators.required),
    controlCity: new FormControl('', Validators.required),
    controlCountry: new FormControl('', Validators.required),

    productGroups: new FormArray<InvoiceRow>([]),
  });

  itemCost$!: Observable<number>;
  InvoiceFormData = signal({});

  onCustomerSelected(customer: CustomerOption): void {
    this.customerService.getCustomerById(customer.id).subscribe((value) => {
      this.selectedCustomer = value;
      this.invoiceForm.controls.controlFullName.setValue(this.selectedCustomer.full_name);
      this.invoiceForm.controls.controlStreetName.setValue(this.selectedCustomer.street_name);
      this.invoiceForm.controls.controlPostalCode.setValue(this.selectedCustomer.postal_code);
      this.invoiceForm.controls.controlCity.setValue(this.selectedCustomer.city);
      this.invoiceForm.controls.controlCountry.setValue(this.selectedCustomer.country);
    });
  }

  private createRow(): InvoiceRow {
    const group = new FormGroup({
      id: new FormControl(),
      name: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required]),
      qty: new FormControl('', Validators.required),
    });
    return group;
  }

  constructor() {
    this.addRow();
  }

  addRow(): void {
    this.invoiceForm.controls.productGroups.push(this.createRow());
  }

  removeRow(index: number): void {
    this.invoiceForm.controls.productGroups.removeAt(index);
  }

  get rows(): InvoiceRow[] {
    return this.invoiceForm.controls.productGroups.controls;
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

  async onSubmit() {
    const { data, error } = await this.supabaseService.client
      .from('invoices')
      .insert({
        customer_id: this.selectedCustomer.id,
        payment_method: this.invoiceForm.controls.controlPayment.value,
        due_date: this.invoiceForm.controls.controlDueDate.value,
        status: 'sent',
      })
      .select();

    if (!data || error) {
      console.log(error.message);
      return;
    }

    for (let product of this.invoiceForm.controls.productGroups.value) {
      const { error } = await this.supabaseService.client.from('orders').insert({
        invoice_id: data[0].id,
        product_id: product.id,
        price: product.price,
        quantity: product.qty,
      });
      if (error) {
        console.log(error.message);
      }
    }
  }
}
