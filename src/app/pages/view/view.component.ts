import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Mayorista from 'src/app/interfaces/Mayorista';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  return: string = '/clientes'
  cliente: Mayorista;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params.id;
      this.clienteService.buscarPorId(id).subscribe(cliente => {
        this.cliente = cliente;
        console.log(this.cliente);
      }, err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.error.details
        });
        this.go();
      });
    });
  }

  eliminar(cliente: Mayorista) {
    Swal.fire({
      title: 'Estás seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Eliminado!',
          `El cliente ${cliente.nombres} ha sido eliminado`,
          'success'
        )
      }
    })
  }

  private go() {
    this.router.navigateByUrl(this.return);
  }

  isToday(fecha_nacimiento: Date) {
    let today = new Date();
    let date = new Date(fecha_nacimiento);
    return date.getDate() == today.getDate() &&
      date.getMonth() == today.getMonth() &&
      date.getFullYear() == today.getFullYear();
  }

}
