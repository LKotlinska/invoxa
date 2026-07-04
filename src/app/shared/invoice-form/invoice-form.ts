import { Component, inject, Output, signal } from '@angular/core';
import { OutlinedInput } from '../../shared/form-fields/outlined-input/outlined-input';
import { SelectInput } from '../../shared/form-fields/select-input/select-input';
import { CustomerAddress, CustomerOption, paymentMethodTypes } from '../../../types/types';
import { ProductService } from '../../services/product.service';
import { FilterAutoSelect } from '../form-fields/filter-auto-select/filter-auto-select';
import { CustomerService } from '../../services/customer.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-invoice-form',
  imports: [OutlinedInput, SelectInput, FilterAutoSelect],
  templateUrl: './invoice-form.html',
  styleUrl: './invoice-form.scss',
})
export class InvoiceForm {
  productService = inject(ProductService);
  customerService = inject(CustomerService);
  paymentMethods = paymentMethodTypes;
  products = this.productService.getProducts();
  selectedCustomer!: CustomerAddress;

  controlDate = new FormControl();
  controlDueDate = new FormControl();
  controlPayment = new FormControl();
  controlFullName = new FormControl();
  controlStreetName = new FormControl();
  controlPostalCode = new FormControl();
  controlCity = new FormControl();
  controlCountry = new FormControl();

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
}
