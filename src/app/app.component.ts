import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Mayorista from './interfaces/Mayorista';
import { ClienteService } from './services/cliente.service';

declare const toggleSidenav: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

}
