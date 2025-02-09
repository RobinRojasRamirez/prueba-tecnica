import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  async login() {
    this.errorMessage = '';

    this.authService.login(this.email, this.password).subscribe({
      next: async () => {
        location.reload();
      },
      error: (err) => {
        this.errorMessage = 'Credenciales incorrectas';
      }
    });
  }
}