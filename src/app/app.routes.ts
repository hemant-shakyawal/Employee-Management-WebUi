import { Routes } from '@angular/router';
export const routes: Routes = [

    {
        path: '',
        loadComponent: () =>
          import('./components/employee-details/employee-details.component').then(
            (c) => c.EmployeeDetailsComponent
          ),
      },

];
