import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, CommonModule],
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css',
})
export class CreateEmployeeComponent implements OnInit {
  useForm!: FormGroup;
  employeeService = inject(EmployeeService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  isEdit = signal(false);
  employee: Employee = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
  };
  constructor() {}
  ngOnInit(): void {
    this.createForm();

    this.route.paramMap.subscribe((result) => {
      const id = result.get('id');
      if (id) {
        //editing
        this.isEdit.set(true);
        this.employeeService.getEmployeeById(Number(id)).subscribe({
          next: (result) => {
            this.employee = result;
            this.useForm.patchValue(result);
          },
          error: (err) => console.error('Error loding employee', err),
        });
      }
    });
  }
  createForm() {
    this.useForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl(''),
      position: new FormControl(''),
    });
  }

  onSubmit() {
    if (this.useForm.valid) {
      const formData: Employee = { ...this.employee, ...this.useForm.value };
      if (this.isEdit()) {
        this.employeeService.updateEmployee(formData).subscribe({
          next: () => {
            this.router.navigate(['/employee-details']);
          },
        });
      } else {
        this.employeeService.createEmployee(formData).subscribe({
          next: () => {
            this.router.navigate(['/employee-details']);
          },
        });
      }
    }
  }

  get firstNameControl() {
    return this.useForm.get('firstName');
  }

  get lastNameControl() {
    return this.useForm.get('lastName');
  }
  get emailControl() {
    return this.useForm.get('email');
  }
}
