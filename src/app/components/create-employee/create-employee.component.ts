import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  imports: [ReactiveFormsModule, MatInputModule,MatButtonModule,CommonModule],
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css'
})

export class CreateEmployeeComponent implements OnInit {

  useForm!:FormGroup
  employeeService=inject(EmployeeService);
  router = inject(Router);

  employee:Employee={
    id: 0,
    firstName:'',
    lastName: '',
    email:'',
    phone: '',
    position: ''
  }
  constructor(){
 
  }
ngOnInit(): void {
 this.createForm()
}
createForm(){
  this.useForm = new FormGroup({
    firstName : new FormControl('', [Validators.required, ]),
    lastName : new FormControl('', [Validators.required, ]),
    email: new FormControl(''),
    phone: new FormControl(''),
    position: new FormControl(''),
  });
}

onSubmit(){
  if (this.useForm.valid) {
    const formData: Employee = this.useForm.value;

    this.employeeService.createEmployee(formData).subscribe({
      next:()=>{
        this.router.navigate(['/employee-details']);
      }
    });
  }

}

get firstNameControl() {
  return this.useForm.get('firstName');
}

get lastNameControl() {
  return this.useForm.get('lastName');
}
}
