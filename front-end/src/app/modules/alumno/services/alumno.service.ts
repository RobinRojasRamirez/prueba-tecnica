import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IParamsTable } from '../../../shared/interfaces/params-table.interface';
import { IResponseTableApi } from '../../../shared/interfaces/response-table-api.interface';
import { IAlumnoTable } from '../interfaces/alumno-table.interface';
import { IAlumnoShow } from '../interfaces/alumno-show.interface';
import { IResponseApi } from '../../../shared/interfaces/response-api.interface';


@Injectable({
  providedIn: 'root',
})
export class AlumnoService {

  API_URL_BASE =  environment.apiUrl + '/alumnos'

  constructor(private readonly _httpClient: HttpClient) { }

  // Obtener datos para datatable apis
  getAlumnoTable(iFilterTable: IParamsTable<null>): Observable<IResponseTableApi<IAlumnoTable>> {
    return this._httpClient.post<IResponseTableApi<IAlumnoTable>>(`${this.API_URL_BASE}/list`, iFilterTable);
  }

  // Obtener datos del alumno por id
  getAlumnoById(id: number): Observable<IResponseApi<IAlumnoShow>>{
    return this._httpClient.get<IResponseApi<IAlumnoShow>>(`${this.API_URL_BASE}/${id}`);
  }

  // Guardar alumno en el backend
  crearAlumno(alumno: IAlumnoShow): Observable<IResponseApi<IAlumnoShow>> {
    return this._httpClient.post<IResponseApi<IAlumnoShow>>(`${this.API_URL_BASE}`, alumno);
  }

  // Editar alumno en el backend
  actualizarAlumno(id: number, alumno: IAlumnoShow): Observable<IResponseApi<IAlumnoShow>> {
    return this._httpClient.put<IResponseApi<IAlumnoShow>>(`${this.API_URL_BASE}/${id}`, alumno);
  }

  // Eliminar lista
  deletedAlumnoById(id: number): Observable<IResponseApi<IAlumnoShow>> {
    return this._httpClient.delete<IResponseApi<IAlumnoShow>>(`${this.API_URL_BASE}/delete/${id}`);
  }

  getFiltrarAlumnoById(grado: string): Observable<IResponseApi<IAlumnoTable[]>>{
    return this._httpClient.get<IResponseApi<IAlumnoTable[]>>(`${this.API_URL_BASE}/grado/${grado}`);
  }

}