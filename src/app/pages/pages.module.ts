import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ClientesComponent } from './clientes/clientes.component';
import { ViewComponent } from './view/view.component';
import { FormComponent } from './form/form.component';



@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    ClientesComponent,
    ViewComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule
  ],
  exports: [
    HomeComponent,
    ClientesComponent,
    ViewComponent,
    FormComponent
  ]
})
export class PagesModule { }
