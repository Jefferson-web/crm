import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { HttpClient } from '@angular/common/http';
import { RestService } from './rest.service';
import Mayorista from '../interfaces/Mayorista';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends RestService {

  constructor(private socketService: SocketService,
    private http: HttpClient) {
    super();
  }

  registrar(cliente: any) {
    return this.http.post<Mayorista>(this.baseUrl + '/mayoristas', cliente);
  }

  recibir$() {
    return this.socketService.createObserver$('cliente:nuevo');
  }

  listar() {
    return this.http.get<Mayorista[]>(this.baseUrl + '/mayoristas');
  }

  buscarPorId(id: number) {
    return this.http.get<Mayorista>(this.baseUrl + `/mayoristas/${id}`)
  }

  actualizarDatos(id:number, datos_actualizados: Mayorista){
    return this.http.put<Mayorista>(this.baseUrl + `/mayoristas/${id}`, datos_actualizados);
  }

}
