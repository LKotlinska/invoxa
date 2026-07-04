import { Component, input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PaymentMethod } from '../../../../types/types';

@Component({
  selector: 'app-select-input',
  imports: [FormsModule, MatInputModule, MatSelectModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './select-input.html',
  styleUrl: './select-input.scss',
})
export class SelectInput {
  label = input<string>();
  items = input<PaymentMethod[]>();
  myControl = input.required<FormControl>();
}
