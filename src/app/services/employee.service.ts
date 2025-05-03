import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${environment.apiUrl}/employee`);
  }
  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${environment.apiUrl}/employee/${id}`);
  }
  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${environment.apiUrl}/employee`, employee);
  }
  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/employee/${id}`);
  }
  updateEmployee(employee: Employee):Observable<Employee>{
    return this.http.put<Employee>(`${environment.apiUrl}/employee/${employee.id}`, employee)
  }
}
