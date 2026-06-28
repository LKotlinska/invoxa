import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Invoices } from './pages/invoices/invoices';
import { Customers } from './pages/customers/customers';
import { Products } from './pages/products/products';
import { Settings } from './pages/settings/settings';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: Dashboard,
  },
  {
    path: 'invoices',
    component: Invoices,
  },
  {
    path: 'customers',
    component: Customers,
  },
  {
    path: 'products',
    component: Products,
  },
  {
    path: 'settings',
    component: Settings,
  },
];
