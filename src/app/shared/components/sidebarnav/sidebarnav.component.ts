import { Component, signal } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { RouterModule } from '@angular/router';
export type MenuItem = {
  icon: string;
  label: string;
  route?: any;
};
@Component({
  selector: 'app-sidebarnav',
  imports: [MatIconModule,MatListModule,RouterModule],
  templateUrl: './sidebarnav.component.html',
  styleUrl: './sidebarnav.component.css',
})
export class SidebarnavComponent {
  menuItem = signal<MenuItem[]>([
    { icon: 'dashboard', label: 'Add Emmployee', route: '/add-employee' },
    { icon: 'info', label: 'Employee-Details', route: '/employee-details' },
  ]);
}