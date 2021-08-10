import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Departamento from 'src/app/interfaces/Departamento';
import Distrito from 'src/app/interfaces/Distrito';
import Mayorista from 'src/app/interfaces/Mayorista';
import Provincia from 'src/app/interfaces/Provincia';
import { ClienteService } from 'src/app/services/cliente.service';
import { DireccionService } from 'src/app/services/direccion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  return: string = '/clientes'
  form: FormGroup;
  departamentos: Array<Departamento>;
  provincias: Array<Provincia>;
  distritos: Array<Distrito>;

  loading: boolean = false;
  edit: boolean = false;
  cliente_a_actualizar: Mayorista;

  constructor(private fb: FormBuilder,
    private direccionService: DireccionService,
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.departamentos = [];
    this.provincias = [];
    this.distritos = [];
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.form = this.createForm();
      this.listarDepartamentos();
      if (params.id) {
        this.clienteService.buscarPorId(params.id).subscribe((cliente: any) => {
          this.cliente_a_actualizar = Object.assign({}, cliente);
          delete cliente.id;
          this.form.setValue(cliente);
          this.edit = true;
        }, err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.error.details
          });
          this.go();
        });
      }
    });

  }

  createForm() {
    return this.fb.group({
      nombres: this.fb.control('', Validators.required),
      ap_paterno: this.fb.control('', Validators.required),
      ap_materno: this.fb.control('', Validators.required),
      email: this.fb.control('', Validators.required),
      razon_social: this.fb.control(''),
      ruc: this.fb.control(''),
      celular: this.fb.control('', Validators.required),
      telef_fijo: this.fb.control(''),
      direccion_cliente: this.fb.control('', Validators.required),
      departamento: this.fb.control('', Validators.required),
      provincia: this.fb.control('', Validators.required),
      distrito: this.fb.control('', Validators.required),
      fecha_nacimiento: this.fb.control(''),
      genero: this.fb.control('Masculino', Validators.required),
      complemento_direccion: this.fb.control(null),
      fecha_registro: this.fb.control(null),
      ciudad: this.fb.control(null),
      comentario_reg_cliente: this.fb.control(null),
      proteccion_datos: this.fb.control(true)
    });
  }

  listarDepartamentos() {
    this.direccionService.getDepartamentos().subscribe(departamentos => {
      this.departamentos = departamentos;
    });
  }

  listarProvincias(select: any) {
    let selectedOption = select.options[select.selectedIndex];
    let departamento_id = selectedOption.getAttribute('id');
    if (!departamento_id) {
      this.getControl('provincia').reset("");
      this.getControl('distrito').reset("");
      this.provincias = [];
      this.distritos = [];
      return;
    };
    this.direccionService.getProvincias(departamento_id).subscribe(provincias => {
      this.getControl('provincia').reset("");
      this.provincias = provincias;
      this.distritos = [];
    });
  }

  listarDistritos(select: any) {
    let selectedOption = select.options[select.selectedIndex];
    let provincia_id = selectedOption.getAttribute('id');
    if (!provincia_id) {
      this.getControl('distrito').reset("");
      this.distritos = [];
      return;
    };
    this.direccionService.getDistritos(provincia_id).subscribe(distritos => {
      this.getControl('distrito').reset("");
      this.distritos = distritos;
    });
  }

  isInvalid(name: string) {
    const control = this.getControl(name);
    return (control.dirty || control.touched) && control.invalid;
  }

  getControl(name: string): AbstractControl {
    return this.form.get(name) as FormControl;
  }

  onSubmit(e: Event) {
    e.preventDefault();
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    if (this.edit) {
      this.editar();
    } else {
      this.registrar();
    }
  }

  registrar() {
    this.loading = true;
    this.clienteService.registrar(this.form.value).subscribe(cliente => {
      this.loading = false;
      Swal.fire({
        icon: 'success',
        title: 'Registrado!',
        text: `El cliente ${cliente.nombres} ${cliente.ap_materno} fue registrado.`
      });
      this.router.navigateByUrl('/clientes');
    }, (err) => {
      Swal.fire(
        'Oops...',
        'Ocurrio un error en la eliminación',
        'error'
      );
      console.log(err);
    });
  }

  editar() {
    this.clienteService.actualizarDatos(this.cliente_a_actualizar.id, this.form.value)
      .subscribe(cliente => {
        Swal.fire({
          icon: 'success',
          title: 'Registrado!',
          text: `El cliente ${cliente.nombres} ${cliente.ap_materno} fue actualizado.`
        });
        this.router.navigateByUrl('/clientes/view/' + this.cliente_a_actualizar.id);
      }, err => {
        Swal.fire(
          'Oops...',
          'Ocurrio un error en la eliminación',
          'error'
        );
        console.log(err);
      });
  }

  private go() {
    this.router.navigateByUrl(this.return);
  }

}
