import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CustomerService } from '../../../services/customer.service';
import { CustomerOption } from '../../../../types/types';

@Component({
  selector: 'app-filter-auto-select',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './filter-auto-select.html',
  styleUrl: './filter-auto-select.scss',
})
export class FilterAutoSelect {
  customerService = inject(CustomerService);
  myControl = new FormControl('', { nonNullable: true });
  customers$: Observable<CustomerOption[]> = this.customerService.getCustomerOptions();
  filteredOptions: Observable<CustomerOption[]>;

  constructor() {
    this.filteredOptions = combineLatest([
      this.customers$,
      this.myControl.valueChanges.pipe(startWith('')),
    ]).pipe(map(([customers, value]) => this._filter(customers, value || '')));
  }

  private _filter(customers: CustomerOption[], value: string | CustomerOption): CustomerOption[] {
    if (typeof value != 'string') {
      //autofill logic
    }

    const filterValue = (typeof value === 'string' ? value : value.email).toLowerCase();
    return customers.filter((customer) => customer.email.toLowerCase().includes(filterValue));
  }

  displayWith(value: CustomerOption): string {
    return value?.email ?? '';
  }
}
