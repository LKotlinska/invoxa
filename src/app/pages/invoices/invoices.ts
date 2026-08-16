import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../shared/header/header';

@Component({
  imports: [RouterOutlet, Header],
  templateUrl: './invoices.html',
  styleUrl: './invoices.scss',
})
export class Invoices {}
