import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { FormComponent } from './form/form.component';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'clientes', component: ClientesComponent },
      { path: 'cliente/view/:id', component: ViewComponent },
      { path: 'cliente/create', component: FormComponent },
      { path: '', pathMatch: 'full', redirectTo: '/home' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
