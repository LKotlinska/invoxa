import { Component, inject, input, OnInit, output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CustomerService } from '../../../services/customer.service';
import { Customer, CustomerOption } from '../../../../types/types';
import { toObservable } from '@angular/core/rxjs-interop';

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
export class FilterAutoSelect<T> {
  label = input.required<string>();
  placeholder = input<string>();
  myControl = new FormControl('', { nonNullable: true });
  options = input.required<T[]>();
  displayFn = input.required<(item: T) => string>();
  optionSelected = output<T>();

  filteredOptions = combineLatest([
    toObservable(this.options),
    this.myControl.valueChanges.pipe(startWith('')),
  ]).pipe(map(([options, value]) => this._filter(options, value || '')));

  private _filter(options: T[], value: string | T): T[] {
    if (typeof value != 'string') {
      this.optionSelected.emit(value);
      // return options;
    }
    if (typeof value === 'string') {
      const filterValue = value.toLowerCase();
      return options.filter((o) => this.displayFn()(o).toLowerCase().includes(filterValue));
    }
    return options;
  }

  displayWith = (value: T): string => (value ? this.displayFn()(value) : '');
}
