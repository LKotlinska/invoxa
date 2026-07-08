import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-outlined-input',
  imports: [MatFormFieldModule, MatIconModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './outlined-input.html',
  styleUrl: './outlined-input.scss',
})
export class OutlinedInput {
  label = input.required<string>();
  placeholder = input<string>();
  type = input.required<string>();
  myControl = input.required<FormControl>();
}
