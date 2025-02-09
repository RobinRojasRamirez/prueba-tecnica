import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkAuthentication();
  }

  private async checkAuthentication(): Promise<boolean | UrlTree> {
    const token = await this.authService.getToken();
    if (token && !this.authService.isTokenExpired(token)) {
      // Si está autenticado, permitir acceso
      return true;
    }
    // Si no está autenticado, redirigir a /login
    return this.router.parseUrl('/login');
  }
}