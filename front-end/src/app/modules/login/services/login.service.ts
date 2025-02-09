import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  API_URL_BASE =  environment.apiUrl + '/api-settings'
  DUMMY_DATA_URL = 'assets/data/configuration-list-table.json'
  DUMMY_LISTA_CONEXTIONS_URL = 'assets/data/lists-connections.json'

  constructor(private readonly _httpClient: HttpClient) { }

  // Login
  login(login: object): Observable<object> {
    return this._httpClient.post<object>(`${this.API_URL_BASE}/login`, login);
  }

}
