import { Component, OnInit } from '@angular/core';

declare interface RouterInfo {
  path: string;
  title: string;
  icon: string;
}

declare const toggleSidenav: any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  routes: RouterInfo[] = [
    { path: '/home', title: 'Inicio', icon: 'fas fa-home' },
    { path: '/clientes', title: 'Clientes', icon: 'fas fa-users' }
  ]

  constructor() { }

  toggle() {
    toggleSidenav();
  }

  ngOnInit(): void {
  }

}
