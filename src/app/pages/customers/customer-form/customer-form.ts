import { Component, inject } from '@angular/core';
import { OutlinedInput } from '../../../shared/form-fields/outlined-input/outlined-input';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { SupabaseService } from '../../../services/supabase.service';

@Component({
  selector: 'app-customer-form',
  imports: [OutlinedInput, ReactiveFormsModule, MatButtonModule],
  templateUrl: './customer-form.html',
  styleUrl: './customer-form.scss',
})
export class CustomerForm {
  supabaseService = inject(SupabaseService);

  customerForm = new FormGroup({
    fullName: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    email: new FormControl<string>('', Validators.required),
    streetName: new FormControl<string>('', Validators.required),
    postalCode: new FormControl<number | null>(null, Validators.required),
    city: new FormControl<string>('', Validators.required),
    country: new FormControl<string>('', Validators.required),
  });

  async onSubmit() {
    const { error } = await this.supabaseService.client.from('customers').insert();
  }
}
