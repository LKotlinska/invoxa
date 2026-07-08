import { Component, DestroyRef, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { merge } from 'rxjs';

@Component({
  selector: 'app-outlined-input',
  imports: [MatFormFieldModule, MatIconModule, MatInputModule, ReactiveFormsModule, FormsModule],
  templateUrl: './outlined-input.html',
  styleUrl: './outlined-input.scss',
})
export class OutlinedInput {
  label = input.required<string>();
  placeholder = input<string>();
  type = input.required<string>();
  myControl = input.required<FormControl>();
}
