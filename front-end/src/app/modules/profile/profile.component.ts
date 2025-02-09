import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ButtonModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any = null;
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  async ngOnInit() {
    try {
      this.user = await this.authService.getStoredUser();
    } catch (error) {
      this.showAlert('error', 'Error', 'No se pudo obtener los datos del usuario');
    }
  }

  async logout() {
    try {
      await this.authService.logout();
      this.showAlert('success', 'Sesión cerrada', 'Has cerrado sesión correctamente', () => {
        this.router.navigate(['/login']);
      });
    } catch (error) {
      this.showAlert('error', 'Error al cerrar sesión', 'Inténtalo de nuevo más tarde.');
    }
  }


  private showAlert(icon: 'success' | 'error', title: string, text: string, callback?: Function) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
      confirmButtonColor: '#FFD700'
    }).then(() => {
      if (callback) callback();
    });
  }
}