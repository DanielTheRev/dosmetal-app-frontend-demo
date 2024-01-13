import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class WebSocketService extends Socket {
  constructor() {
    super({
      url: environment.socket_config.url,
      options: {
        path: environment.socket_config.path,
        transports: ['websocket', 'polling'],
      },
    });
  }
}
