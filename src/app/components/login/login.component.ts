import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [MatCardModule, MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginObj: any = {
    userName: '',
    password: '',
  };
  router = inject(Router);

  onLogin(): void {
    if (
      this.loginObj.userName == 'admin' &&
      this.loginObj.password == '12345'
    ) {
      this.router.navigateByUrl('employee');
    } else {
      alert('Invalid login details');
    }
  }
}
