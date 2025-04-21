import { Component,OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';



const ELEMENT_DATA: Employee[] = [
 
];

@Component({
  selector: 'app-employee-details',
  imports: [MatTableModule],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email','phone','position'];
  employeeDataSource= ELEMENT_DATA ;
  constructor(private employeeService:EmployeeService){}


  ngOnInit(): void {
      this.getEmployees();
  }
  getEmployees():void{
    this.employeeService.getEmployees().subscribe((employee)=>{
    this.employeeDataSource=employee
    })
  }
}
