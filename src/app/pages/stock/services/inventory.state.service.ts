import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IInventory, IInventoryItem } from 'src/app/pages/stock/interfaces/stock.interface';
import { WebSocketService } from 'src/app/shared/services/websocket.service';
import { InventoryService } from './inventory.service';
import { InventoryNotificationService } from './inventoryNotification.service';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class InventoryStoreService {
  private readonly _inventorySource = new BehaviorSubject<IInventory[]>([]);
  readonly inventory$ = this._inventorySource.asObservable();

  constructor(
    private WebSockets: WebSocketService,
    private InventoryService: InventoryService,
    private InventoryNotificationService: InventoryNotificationService
  ) {
    this.InventoryService.getAllInventory().subscribe({
      next: (res) => this._setInventory(res),
      error: (error: HttpErrorResponse) => console.log(error.error.message),
    });

    //* retrieve changes on inventory
    this.WebSockets.fromEvent<IInventory[]>(
      '[Inventory] changes on inventory'
    ).subscribe((res) => this._inventorySource.next(res));
  }

  private _setInventory(inventory: IInventory[]) {
    this._inventorySource.next(inventory);
  }

  addInventory(inventory: IInventory) {
    this._setInventory([...this._inventorySource.getValue(), inventory]);
    this.WebSockets.emit('[Inventory] inform inventory changes');
  }

  addStockToInventoryOrEdit(id: string, inventory: IInventory) {
    return new Promise((resolve, reject) => {
      const newInventory = this._inventorySource.getValue().map((e) => {
        if (e._id === id) {
          e = inventory;
          // e.Inventario = this.SortInventory(e.Inventario);
          return e;
        }
        return e;
      });
      this.WebSockets.emit(
        '[Inventory] inform inventory changes',
        newInventory
      );
      this._setInventory(newInventory);
      return resolve(true);
    });
  }

  deleteInventory(_id: string) {
    this.InventoryNotificationService.DeleteOrEdit('borrar').then((e) => {
      if (e.isConfirmed) {
        this.InventoryService.deleteFromInventory(_id).subscribe((res) => {
          if (res.status) {
            const newInventory = this._inventorySource
              .getValue()
              .filter((e) => e._id !== _id);
            this._setInventory(newInventory);
            this.WebSockets.emit(
              '[Inventory] inform inventory changes',
              newInventory
            );
            this.InventoryNotificationService.toastNotification(
              'success',
              res.message
            );
            return;
          }
          this.InventoryNotificationService.toastNotification(
            'error',
            res.message
          );
          return;
        });
      }
    });
  }

  changeMinumumStock(itemID: string, newMinumum: number) {
    this.InventoryNotificationService.DeleteOrEdit('editar').then((edit) => {
      if (edit.isConfirmed) {
        this.InventoryService.changeMinumumStock(itemID, newMinumum).subscribe({
          next: (res) => {
            const newInventory = this._inventorySource.getValue().map((e) => {
              if (e._id === itemID) {
                e = res.itemWithChanges;
                return e;
              }
              return e;
            });
            this._setInventory(newInventory);
            this.WebSockets.emit(
              '[Inventory] inform inventory changes',
              newInventory
            );
            this.InventoryNotificationService.toastNotification(
              'success',
              res.message
            );
          },
          error: (error) => {
            this.InventoryNotificationService.toastNotification(
              'error',
              error.error.message
            );
          },
        });
      }
    });
  }

  getIventoryItem(itemID: string) {
    // return this._inventorySource.getValue().find((e) => e._id === itemID);
    return this.inventory$.pipe(
      map(e => {
        const item = e.find((e) => e._id === itemID);
        return item
      })
    )
  }

  private SortInventory = (Inventory: IInventoryItem[]) => {
    const notUnidadesSueltas = Inventory.filter(
      (e) => e.tipo_contenedor !== 'Unidades sueltas'
    ).sort((a, b) => {
      if (a.esta_abierto) return 1;
      return -1;
    });

    const unidadesSueltas = Inventory.filter(
      (e) => e.tipo_contenedor === 'Unidades sueltas'
    ).sort((a, b) => {
      return a.cantidad_de_contenedor > b.cantidad_de_contenedor ? 1 : -1;
    });

    return [...notUnidadesSueltas, ...unidadesSueltas];
  };
}
