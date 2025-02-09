import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import(
        './UI/pages/index-alumno/index-alumno.component'
      ).then((m) => m.IndexAlumnoComponent),
  },
  {
    path: 'create',
    data: {
      slug: 'create',
      title: 'Crear nuevo alumno',
      breadcrumb_children: {
        icon: 'fi-rr-edit',
        label: 'Crear',
      },
    },
    loadComponent: () =>
      import('./UI/pages/form-alumno/form-alumno.component').then(
        (m) => m.FormAlumnoComponent
      ),
  },
  {
    path: 'edit/:id',
    data: {
      slug: 'edit',
      title: 'Editar alumno',
      breadcrumb_children: {
        icon: 'fi-rr-edit',
        label: 'Editar',
      },
    },
    loadComponent: () =>
      import('./UI/pages/form-alumno/form-alumno.component').then(
        (m) => m.FormAlumnoComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlumnoRoutingModule { }
