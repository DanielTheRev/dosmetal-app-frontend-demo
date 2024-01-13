import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { WebSocketService } from '../../../shared/services/websocket.service';
import { ICliente } from '../interfaces/clientes.interface';
import { ClientesService } from './clients.service';
import { ClientNotificationService } from './clientNotifications.service';
import { NotificationsService } from 'src/app/shared/services/notifications.service';
import { PresupuestoStoreService } from '../../presupuestos/services/presupuesto.store.service';

@Injectable({
  providedIn: 'root',
})
export class ClientsStoreService {
  private readonly _ClientsStoreSource = new BehaviorSubject<ICliente[]>([]);
  readonly Clients$ = this._ClientsStoreSource.asObservable();

  constructor(
    private ClientesService: ClientesService,
    private WebSocketService: WebSocketService,
    private ClientNofitications: ClientNotificationService,
    private NotificationService: NotificationsService,
    private PresupuestoStore: PresupuestoStoreService
  ) {
    this.ClientesService.getAllEmpresas().subscribe((res) =>
      this._setClients(res)
    );
    //* CAMBIOS EN PRESUPUESTOS;
    this.WebSocketService.fromEvent<{
      ClientID: string;
      PresupuestoID: string;
    }>('[CLIENTS] Presupuesto deleted').subscribe((res) =>
      this.removePresupuestoToClient(res)
    );

    this.WebSocketService.fromEvent<{
      clientID: string;
      presupuestoID: string;
    }>('[CLIENTS] Presupuesto added').subscribe((res) =>
      this.addPresupuestoToClient(res)
    );
  }

  private _setClients(Clients: ICliente[]) {
    this._ClientsStoreSource.next(this.sortClients(Clients));
  }

  private getClientsValue() {
    return this._ClientsStoreSource.getValue();
  }

  addClient(Client: ICliente) {
    this.ClientesService.addNewClient(Client).subscribe({
      next: (res) => {
        const clients = [...this.getClientsValue(), res.newClient];
        this._setClients(clients);
        this.NotificationService.requestSuccessful('Cliente Agregado');
      },
    });
  }

  getClient(_id: string) {
    return this.Clients$.pipe(
      map((e) => {
        const client = e.find((f) => f._id === _id);
        return client;
      })
    );
  }

  removeClient(ClientID: string) {
    this.ClientNofitications.confirmDeleteClient().then((res) => {
      if (res.isConfirmed) {
        this.ClientesService.deleteClient(ClientID).subscribe({
          next: (val) => {
            const Clients = this.getClientsValue().filter(
              (e) => e._id !== ClientID
            );
            this._setClients(Clients);
            this.NotificationService.requestSuccessful('Cliente Eliminado');
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }

  editClient(Client: ICliente) {
    this.ClientesService.editClient(Client).subscribe({
      next: (res) => {
        const clients = this.getClientsValue().map((e) => {
          if (e._id === Client._id) {
            e = {
              ...e,
              ...Client,
            };
            return e;
          }
          return e;
        });
        this._setClients(clients);
        this.NotificationService.requestSuccessful(res.message);
        this.PresupuestoStore.editPresupuestoClient(Client);
      },
      error: (err) => {},
    });
  }

  private removePresupuestoToClient(Data: {
    ClientID: string;
    PresupuestoID: string;
  }) {
    const clients = this.getClientsValue().map((client) => {
      if (client._id === Data.ClientID) {
        client.presupuestos = client.presupuestos.filter(
          (e) => e !== Data.PresupuestoID
        );
      }
      return client;
    });

    this._setClients(clients);
    return;
  }

  private addPresupuestoToClient(presupuesto: {
    clientID: string;
    presupuestoID: string;
  }) {
    const clients = this.getClientsValue().map((client) => {
      if (client._id === presupuesto.clientID) {
        client.presupuestos.push(presupuesto.presupuestoID);
      }
      return client;
    });
    this._setClients(clients);
  }

  private sortClients(arr: ICliente[]) {
    return arr.sort((a, b) => (a.nombre > b.nombre ? 1 : -1));
  }
}
