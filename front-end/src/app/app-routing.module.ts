import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestGuard } from './guards/guest.guard';
import { LoginComponent } from './modules/login/UI/pages/form-login/form-login.component';
import { HomeComponent } from './modules/home/home.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { ProfileComponent } from './modules/profile/profile.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [GuestGuard] // Protege la ruta con GuestGuard
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard], // Protege la ruta con AuthGuard
    children: [
      { path: '', component: HomeComponent },
      { path: 'perfil', component: ProfileComponent },
      {
        path: 'alumno',
        loadChildren: () => import('./modules/alumno/alumno.module').then(m => m.AlumnoModule)
      }
    ]
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Ruta por defecto
  { path: '**', redirectTo: 'dashboard' } // Ruta comodín
];

// Usar hash en la ruta para evitar recargas de página
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }