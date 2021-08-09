import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Mayorista from 'src/app/interfaces/Mayorista';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {


  clientes: Mayorista[];
  sub1: Subscription;
  sub2: Subscription;

  constructor(private clienteService: ClienteService) {
    this.clientes = [];
  }

  ngOnInit(): void {
    this.listar();
    this.recibir();
  }

  isToday(fecha_nacimiento: Date) {
    let today = new Date();
    let date = new Date(fecha_nacimiento);
    return date.getDate() == today.getDate() &&
      date.getMonth() == today.getMonth() &&
      date.getFullYear() == today.getFullYear();
  }

  listar() {
    this.sub1 = this.clienteService.listar().subscribe((clientes) => {
      this.clientes = clientes;
    });
  }

  recibir() {
    this.sub2 = this.clienteService.recibir$().subscribe(cliente => {
      console.log(cliente);
      this.clientes.unshift(cliente);
    });
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }


}
