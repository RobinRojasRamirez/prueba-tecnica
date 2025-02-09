import { Component, EventEmitter, Input, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner'
import { DialogModule } from 'primeng/dialog'
import { ToastModule } from 'primeng/toast'
import { MessageService } from 'primeng/api'
import { InputTextModule } from 'primeng/inputtext'
import { AlertService } from '../../../../../shared/services/alert.service'
import { IAlumnoShow } from '../../../interfaces/alumno-show.interface'
import { CalendarModule } from 'primeng/calendar'
import { lastValueFrom } from 'rxjs'
import { AlumnoService } from '../../../services/alumno.service'

@Component({
  selector: 'app-form-alumno',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    ProgressSpinnerModule,
    DialogModule,
    ToastModule,
    InputTextModule,
    CalendarModule
  ],
  templateUrl: './form-alumno.component.html',
  styleUrls: ['./form-alumno.component.css'],
  providers: [ MessageService ]

})
export class FormAlumnoComponent {

  @Input() displayModal = false
  @Input() id: number = 0
  @Input() slug: string | null = ''
  @Output() closeModal = new EventEmitter<boolean>()

  title: string = ''
  frmAlumnos!: FormGroup;
  loading: boolean = false
  isLoading: boolean = false;
  status: string = 'success'

  fechaNacimiento: string = ''

  constructor(
    private fb: FormBuilder,
    private _alertService: AlertService,
    private _alumnoService: AlumnoService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.title = 'Crear Alumno'
    this.frmAlumnos = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      nombre_padre: ['', Validators.required],
      nombre_madre: ['', Validators.required],
      grado: ['', Validators.required],
      seccion: ['', Validators.required],
      fecha_ingreso: ['', Validators.required],
    })
    if ( this.id ) {
      this.title = 'Editar Alumno'
      this.loadAlumno()
    }
  }

  async loadAlumno(): Promise<void> {
    this.isLoading = true;
    try {
        const response = await lastValueFrom(this._alumnoService.getAlumnoById(this.id))
        if ( response.status === this.status ) {
            const data: IAlumnoShow = response.data
            this.frmAlumnos.get('nombre')?.setValue(data.nombre)
            this.frmAlumnos.get('fecha_nacimiento')?.setValue(new Date(data.fecha_nacimiento))
            this.frmAlumnos.get('nombre_padre')?.setValue(data.nombre_padre)
            this.frmAlumnos.get('nombre_madre')?.setValue(data.nombre_madre)
            this.frmAlumnos.get('grado')?.setValue(data.grado)
            this.frmAlumnos.get('seccion')?.setValue(data.seccion)
            this.frmAlumnos.get('fecha_ingreso')?.setValue(new Date(data.fecha_ingreso))
        }
    } catch (error) {
        this._alertService.showError('Mensaje del sistema.', 'Ocurrió un error al cargar la información')
        this.isLoading = false
        this.hideModal()
    } finally {
        this.isLoading = false
    }
  }

  hideModal(): void {
    this.displayModal = false
    this.closeModal.emit(false)
  }

  transformData(): IAlumnoShow {
    const formValues = this.frmAlumnos.getRawValue()
    return {
      id: this.id || 0,
      nombre: formValues.nombre,
      fecha_nacimiento: formValues.fecha_nacimiento.toISOString().split('T')[0],
      nombre_padre: formValues.nombre_padre,
      nombre_madre: formValues.nombre_madre,
      grado: formValues.grado, 
      seccion: formValues.seccion,
      fecha_ingreso: formValues.fecha_ingreso.toISOString().split('T')[0],
    }
  }


  async onSubmit(): Promise<void> {
    if ( this.frmAlumnos.valid ) {
      const transformedData = this.transformData()
      try {
        this.isLoading = true
        if ( this.slug === 'crear' ) {
          // Crear Alumno
          const response = await lastValueFrom(this._alumnoService.crearAlumno(transformedData));
          if( response.status === this.status ) {
            this._alertService.showSuccess('Mensaje del sistema.', response.message || 'Alumno creado exitosamente')
            this.hideModal()
          }
        } else if ( this.slug === 'editar' && this.id ) {
          // Actualizar Alumno
          const response = await lastValueFrom(this._alumnoService.actualizarAlumno(this.id, transformedData));
          if( response.status === this.status ) {
            this._alertService.showSuccess('Mensaje del sistema.',  response.message || 'Alumno actualizado exitosamente');
            this.hideModal()
          }
        }
        this.isLoading = false
      } catch (error) {
        this._alertService.showError('Mensaje del sistema.', 'Ocurrió un error al guardar la lista');
        this.isLoading = false
      }
    } else {
      this._alertService.showError('Mensaje del sistema.', 'Por favor, completa todos los campos correctamente')
    }
  }


}
