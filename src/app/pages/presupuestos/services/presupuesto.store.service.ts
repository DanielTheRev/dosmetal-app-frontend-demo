import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';

import { PresupuestosService } from './presupuestos.service';
import { WebSocketService } from '../../../shared/services/websocket.service';
import { PresupuestosNotificationsService } from './presupuestosNotifications.service';
import { IPresupuesto } from '../interfaces/presupuesto.interface';
import { Router } from '@angular/router';
import { ICliente } from '../../clients/interfaces/clientes.interface';

@Injectable({
  providedIn: 'root',
})
export class PresupuestoStoreService {
  private readonly _presupuestoSource = new BehaviorSubject<IPresupuesto[]>([]);
  readonly Presupuestos$ = this._presupuestoSource.asObservable();

  constructor(
    private PresupuestoService: PresupuestosService,
    private PresupuestoNotifications: PresupuestosNotificationsService,
    private WebSocketService: WebSocketService,
    private Router: Router
  ) {
    this.PresupuestoService.getAllPresupuestos().subscribe((res) => {
      this._setPresupuestos(res);
    });
    //* ULTIMOS CAMBIOS DEL ARRAY DE PRESUPUESTOS
    this.WebSocketService.fromEvent<IPresupuesto>(
      '[PRESUPUESTOS] New Presupuesto'
    ).subscribe((res) =>
      this._setPresupuestos([...this._getPresupuestosValue(), res])
    );

    this.WebSocketService.fromEvent<{ presupuestoID: string }>(
      '[PRESUPUESTOS] Presupuesto Deleted'
    ).subscribe((res) => {
      this._setPresupuestos(
        this._getPresupuestosValue().filter((e) => e._id !== res.presupuestoID)
      );
    });

    this.WebSocketService.fromEvent<IPresupuesto>(
      '[PRESUPUESTOS] Change on presupuesto'
    ).subscribe((res) => {
      this._setPresupuestos(
        this._getPresupuestosValue().map((f) => {
          if (f._id === res._id) {
            f = res;
            return f;
          }
          return f;
        })
      );
    });
  }

  private _setPresupuestos(presupuestos: IPresupuesto[]) {
    this._presupuestoSource.next(this.sortPresupuestos(presupuestos));
    return;
  }

  private _getPresupuestosValue() {
    return this._presupuestoSource.getValue();
  }

  addNewPresupuesto(NewPresupuesto: IPresupuesto) {
    return new Promise<boolean>((resolve, reject) => {
      this.PresupuestoService.createPresupuesto(NewPresupuesto).subscribe({
        next: (res) => {
          this.Router.navigate([
            'presupuestos',
            'editar-presupuesto',
            res.presupuesto._id,
          ]);
          resolve(true);
        },
        error: (error) => {
          reject(false);
          console.log(error);
        },
      });
    });
  }

  ModifyPresupuesto(Changes: IPresupuesto) {
    return new Promise((resolve, reject) => {
      this.PresupuestoService.saveChangesOnPresupuesto(Changes).subscribe({
        next: (res) => {
          const presupuestos = this._getPresupuestosValue().map((e) => {
            if (e._id === Changes._id) {
              e = res.presupuestoUpdated;
              this.PresupuestoNotifications.requestSuccessful(res.message);
              return e;
            }
            return e;
          });
          this._setPresupuestos(presupuestos);
          return resolve(true);
        },
        error: (err) => {
          console.log(err.error);
        },
      });
    });
  }

  editPresupuestoClient(Client: ICliente) {
    const newPresupuestos = this._getPresupuestosValue().map((presupuesto) => {
      if (presupuesto.Cliente._id === Client._id) {
        presupuesto.Cliente = { ...presupuesto.Cliente, ...Client };
      }
      return presupuesto;
    });
    this._setPresupuestos(newPresupuestos);
  }

  getPresupuesto(PresupuestoID: string) {
    return this._getPresupuestosValue().find((e) => e._id === PresupuestoID);
  }

  deletePresupuesto(PresupuestoID: string) {
    this.PresupuestoNotifications.confirmDeletePresupuesto().then((res) => {
      if (res.isConfirmed) {
        this.PresupuestoService.deletePresupuesto(PresupuestoID).subscribe({
          next: (res) => {
            this.PresupuestoNotifications.requestSuccessful(res.message);
          },
        });
      }
    });
  }

  private sortPresupuestos(arr: IPresupuesto[]) {
    return arr.sort((a, b) => (a.PresupuestoNum < b.PresupuestoNum ? 1 : -1));
  }
}
