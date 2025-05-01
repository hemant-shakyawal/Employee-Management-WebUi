import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'employee-details',
        loadComponent: () =>
          import(
            './components/employee-details/employee-details.component'
          ).then((c) => c.EmployeeDetailsComponent),
      },
      {
        path: 'add-employee',
        loadComponent: () =>
          import('./components/create-employee/create-employee.component').then(
            (c) => c.CreateEmployeeComponent
          ),
      },
    ],
  },
];
