import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observer } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket) { }

  emit(event: string, data: any) {
    this.socket.emit('emit', data);
  }

  createObserver$(event: string) {
    return new Observable((observer: Observer<any>) => {
      return this.socket.on(event, (data: any) => {
        observer.next(data);
      });
    });
  }

}
