import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

const ELEMENT_DATA: Employee[] = [];

@Component({
  selector: 'app-employee-details',
  imports: [MatTableModule, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css',
})
export class EmployeeDetailsComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'phone',
    'position',
    'edit',
    'delete',
  ];
  employeeDataSource = ELEMENT_DATA;
  constructor() {}
  employeeService = inject(EmployeeService);
  router = inject(Router);


  ngOnInit(): void {
    this.getEmployees();
  }
  getEmployees(): void {
    this.employeeService.getEmployees().subscribe((employee) => {
      this.employeeDataSource = employee;
    });
  }

  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {
        this.employeeDataSource = this.employeeDataSource.filter(
          (e) => e.id != id
        );
      },
    });
  }
  editEmployee(id: number): void {
    this.router.navigate(['/edit', id]);
  }
}
