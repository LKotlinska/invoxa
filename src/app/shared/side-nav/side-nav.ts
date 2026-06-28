import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';

type NavItem = {
  title: string;
  icon?: string;
};

@Component({
  selector: 'app-side-nav',
  imports: [MatListModule, MatIconModule, RouterLink, MatDividerModule],
  templateUrl: './side-nav.html',
  styleUrl: './side-nav.scss',
})
export class SideNav {
  fragments: NavItem[] = [
    { title: 'dashboard', icon: 'dashboard' },
    { title: 'invoices', icon: 'article' },
    { title: 'customers', icon: 'person' },
    { title: 'products', icon: 'inventory_2' },
    { title: 'settings', icon: 'settings' },
  ];
  activeLink: string | null = null;
}
