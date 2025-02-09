import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 🟢 No agregar token si la solicitud es ⁠api/login⁠
    if (req.url.includes('/api/login')) {
      return next.handle(req);
    }

    return from(this.authService.getToken()).pipe(
      take(1),
      switchMap(token => { // 🔹 switchMap ya no devuelve una promesa
        let modifiedReq = req;

        // 🟢 Si hay un token, lo agregamos al encabezado de la petición
        if (token) {
          modifiedReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}` // Corrección aquí: Usar las comillas invertidas para interpolación
            }
          });
        }

        // 🔹 Devolvemos directamente la petición modificada
        return next.handle(modifiedReq);
      }),
      catchError(error => this.handleAuthError(error))
    );
  }

  // 🟢 Manejar errores de autenticación
  private handleAuthError(error: any): Observable<never> {
    if (error instanceof HttpErrorResponse && (error.status === 401 || error.status === 403)) {
      console.log('Token inválido o expirado. Cerrando sesión...');
      this.authService.logout().then(() => {
        this.router.navigate(['/login']);
      });
    }
    return throwError(() => error);
  }
}
