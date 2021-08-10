import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cantidad_clientes: number = 0;
  clientes_hoy: number = 0

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.getEstadisticas();
  }

  getEstadisticas() {
    this.clienteService.getEstadisticas().subscribe(responseList => {
      this.cantidad_clientes = Number(responseList[0]);
      this.clientes_hoy = Number(responseList[1]);
    });
  }

}
