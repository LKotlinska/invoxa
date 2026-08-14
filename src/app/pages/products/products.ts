import { Component, inject, signal } from '@angular/core';
import { Header } from '../../shared/header/header';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [Header, RouterOutlet],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {}
