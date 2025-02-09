import { Component, ViewChild } from '@angular/core'
import { RouterModule } from '@angular/router'
import { ConfirmationService, MessageService } from 'primeng/api'
import { ButtonModule } from 'primeng/button'
import { lastValueFrom } from 'rxjs'
import { TableLazyLoadEvent, TableModule } from 'primeng/table'
import { InputTextModule } from 'primeng/inputtext'
import { DropdownModule } from 'primeng/dropdown'
import { CommonModule } from '@angular/common'
import { TooltipModule } from 'primeng/tooltip'
import { TagModule } from 'primeng/tag'
import { Menu, MenuModule } from 'primeng/menu'
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { ICols } from '../../../../../shared/interfaces/cols.interface'
import { IParamsTable } from '../../../../../shared/interfaces/params-table.interface'
import { IAlumnoTable } from '../../../interfaces/alumno-table.interface'
import { AlertService } from '../../../../../shared/services/alert.service'
import { AlumnoService } from '../../../services/alumno.service'
import transform from '../../../../../shared/utils/filter-table.transform'
import { FormAlumnoComponent } from '../form-alumno/form-alumno.component'
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ToastModule } from 'primeng/toast'

@Component({
  selector: 'app-index-alumnoConfigurations',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    DropdownModule,
    TooltipModule,
    RouterModule,
    TagModule,
    MenuModule,
    ConfirmDialogModule,
    FormAlumnoComponent,
    ReactiveFormsModule,
    FormsModule,
    ToastModule
  ],
  templateUrl: './index-alumno.component.html',
  styleUrls: ['./index-alumno.component.scss'],
  providers: [ConfirmationService, MessageService, AlertService],
})
export class IndexAlumnoComponent {

  @ViewChild(Menu) menu?: Menu;
  frmGrado!: FormGroup;
  status: string = 'success'
  rowSize: number = 10
  listsAlumnos: IAlumnoTable[] = []
  totalRecords: number = 0
  iParamsTable!: IParamsTable<null>
  loadingTable: boolean = false
  selectedId: number | null = null;
  slug: string = ''
  displayModal: boolean = false
  id: number = 0

  cols: ICols[] = [
    { field: 'id', header: 'ID', type: 'number', nameClass: 'text-center', order: true },
    { field: 'nombre', header: 'Nombre', type: 'string', nameClass: 'text-left', order: true },
    { field: 'fecha_nacimiento', header: 'Fecha de nacimiento', type: 'string', nameClass: 'text-left', order: true },
    { field: 'nombre_padre', header: 'Nombre del padre', type: 'string', nameClass: 'text-left', order: true },
    { field: 'nombre_madre', header: 'Nombre de la madre', type: 'string', nameClass: 'text-left', order: true },
    { field: 'grado', header: 'Grado', type: 'string', nameClass: 'text-left', order: true },
    { field: 'seccion', header: 'Sección', type: 'string', nameClass: 'text-left', order: true },
    { field: 'actions', header: 'Acciones', type: 'actions', nameClass: 'text-center', minWidth: '150px', order: false },
  ];

  menuItems = [
    {
      label: 'Editar',
      icon: 'pi pi-pencil',
      command: () => {
        this.openModalAlumno('editar', this.id);
      }
    },
    {
      label: 'Eliminar',
      icon: 'pi pi-trash',
      command: () => {
        this.deleted(this.id || 0);
      }
    }
  ];

  constructor(
    private readonly _alumnoService: AlumnoService,
    private readonly _confirmationService: ConfirmationService,
    private readonly _alertService: AlertService,
    private readonly fb: FormBuilder,
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.frmGrado = this.fb.group({
      grado: [''],
    })
  }

  deleted(id: number) {
    this._confirmationService.confirm({
      message: '¿Quieres eliminar este registro?',
      header: 'Eliminar elemento',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      accept: async () => {
        await this._alumnoService.deletedAlumnoById(id)
        this._alertService.showSuccess('Mensaje del sistema', 'Registro eliminado correctamente')
        this.listsAlumnos = this.listsAlumnos.filter((list) => list.id !== id)
      },
    })
  }

  openMenu(event: Event, menu: Menu, id: number) {
    this.id = id;
    menu.toggle(event);
  }

  openModalAlumno(slug: string = '', id: number = 0 ) {
    this.displayModal = true
    this.slug = slug
    this.id = id
  }

  limpiar() {
    if ( this.frmGrado.get('grado')?.value ) {
      this.frmGrado.reset()
      this.loadTable()
    }   
  }

  async loadTable(lazyLoadEvent: TableLazyLoadEvent = {}): Promise<void> {
    try {
      this.loadingTable = true
      this.iParamsTable = transform(lazyLoadEvent, this.rowSize)
      this.iParamsTable.params = null
      const response = await lastValueFrom(
        this._alumnoService.getAlumnoTable(this.iParamsTable)
      )
      const data = response.data
      this.listsAlumnos = data.content
      this.totalRecords = data.totalElements
      this.loadingTable = false
    } catch (error) {
      this.loadingTable = false
      this.listsAlumnos = []
      this.totalRecords = 0
    }
  }

  getSeverity(active: boolean): string {
    switch (active) {
      case true:
        return 'success';
      case false:
        return 'danger';
      default:
        return 'info';
    }
  }

  refreshData(hide = false) {
    this.displayModal = hide
    this.loadTable()
  }

  async onSubmit(): Promise<void> {
    const grado = this.frmGrado.get('grado')?.value
    if ( grado ) { 
      this.loadingTable = true;
      try {
          const response = await lastValueFrom(this._alumnoService.getFiltrarAlumnoById(grado))
          if ( response.status === this.status ) {
            this.listsAlumnos = response.data
          }
      } catch (error) {
          this._alertService.showError('Mensaje del sistema.', 'Ocurrió un error al cargar la información')
          this.loadingTable = false
      } finally {
          this.loadingTable = false
      }
    }
  }
  
}
