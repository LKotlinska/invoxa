import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Invoices } from './pages/invoices/invoices';
import { Customers } from './pages/customers/customers';
import { Products } from './pages/products/products';
import { Settings } from './pages/settings/settings';
import { InvoiceForm } from './pages/invoices/invoice-form/invoice-form';
import { InvoiceTable } from './pages/invoices/invoice-table/invoice-table';

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
    children: [
      {
        path: '',
        component: InvoiceTable,
      },
      {
        path: 'add',
        component: InvoiceForm,
      },
    ],
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
