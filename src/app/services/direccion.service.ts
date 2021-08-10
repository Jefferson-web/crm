import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Departamento from '../interfaces/Departamento';
import Distrito from '../interfaces/Distrito';
import Provincia from '../interfaces/Provincia';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class DireccionService extends RestService {

  constructor(private http: HttpClient) {
    super();
  }

  getDepartamentos() {
    return this.http.get<Departamento[]>(this.baseUrl + '/departamentos');
  }

  getProvincias(departamento_id: number) {
    return this.http.get<Provincia[]>(this.baseUrl + `/departamento/${departamento_id}/provincias`);
  }

  getDistritos(provincia_id: number) {
    return this.http.get<Distrito[]>(this.baseUrl + `/provincia/${provincia_id}/distritos`);
  }

}
