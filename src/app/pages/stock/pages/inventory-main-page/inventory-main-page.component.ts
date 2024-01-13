import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '../../../../../environments/environment';
import {
  IcartItem,
  IInventory,
  IInventoryItem,
  ISuccessRetiro,
} from '../../interfaces/stock.interface';

import { InventoryStoreService } from '../../services/inventory.state.service';
import { InventoryService } from '../../services/inventory.service';
import { InventoryNotificationService } from '../../services/inventoryNotification.service';

import { AddToInventoryDialogComponent } from '../../components/add-to-inventory-dialog/add-to-inventory-dialog.component';
import { RetirarDialogComponent } from '../../components/retirar-dialog/retirar-dialog.component';
import { CartItemsListDialogComponent } from '../../components/cart-items-list-dialog/cart-items-list-dialog.component';
import { InventoryHistoryDialogComponent } from '../../components/inventory-history-dialog/inventory-history-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventory-main-page',
  templateUrl: './inventory-main-page.component.html',
  styleUrls: ['./inventory-main-page.component.scss'],
})
export class InventoryMainPageComponent implements OnInit {
  tabs: string[] = ['Todo', 'Sin Stock', 'Pañol', 'Cajon cerrado'];
  activeTab: string = 'Todo';
  private Inventory: ReadonlyArray<IInventory> = [];
  InventoryFiltered: IInventory[] = [];
  categories: string[] = [];
  cart: IcartItem[] = [];

  dataStatus: string = 'Data ready';
  InventoryStatus: string = 'with elements';

  public readonly Environment = environment;
  constructor(
    private MatDialog: MatDialog,
    private InventoryStore: InventoryStoreService,
    private InventoryService: InventoryService,
    private InventoryNotificationService: InventoryNotificationService,
    private Router: Router
  ) {}

  ngOnInit(): void {
    this.InventoryStore.inventory$.subscribe((res) => {
      this.Inventory = res;
      this.InventoryFiltered = res;
      this.Inventory.forEach((e) => {
        if (!this.categories.includes(e.Categoria.rubro)) {
          this.categories.push(e.Categoria.rubro);
        }
      });
    });
  }

  changeCategorie(categorie: string) {
    const categories: any = {
      Todo: () => {
        this.InventoryFiltered = [...this.Inventory];
        this.activeTab = 'Todo';
      },
      'Sin Stock': () => {
        this.InventoryFiltered = this.Inventory.filter(
          (e) => e.InventoryState == 'Sin Stock'
        );
        this.activeTab = 'Sin Stock';
      },
      Pañol: () => {
        this.activeTab = categorie;
        this.InventoryFiltered = this.Inventory.filter(
          (e) => e.Ubicacion === 'Pañol'
        );
      },
      'Cajon cerrado': () => {
        this.activeTab = categorie;
        this.InventoryFiltered = this.Inventory.filter(
          (e) => e.Ubicacion === 'Cajon cerrado'
        );
      },
    };
    categories[categorie]();
  }

  openImageOnDialog() {
    console.log('se hizo doble click en la imagen');
  }

  searchItem(name: string) {
    if (name.length <= 0 || name === undefined) {
      this.InventoryFiltered = [...this.Inventory];
      return;
    }
    name = name.toLowerCase();

    this.InventoryFiltered = this.Inventory.filter(
      (e) =>
        e.Nombre.toLowerCase().includes(name) ||
        e.Referencia.toLowerCase().includes(name) ||
        e.Categoria.rubro.toLocaleLowerCase().includes(name)
    );
  }

  addInventory(itemID?: string) {
    const route = ['stock', 'CrearInventario'];
    if (itemID) route.push(itemID);
    this.Router.navigate(route);
    return;
  }

  addToCart(item: IInventory) {
    //* guardamos el item en caso de que tengan que sacarlo en localstorage;
    this.SaveRecoverItemCopyFromCart('save', item);

    const dialogRef = this.MatDialog.open(RetirarDialogComponent, {
      data: item,
      width: '320px',
    });
    dialogRef.afterClosed().subscribe((formResult) => {
      if (!formResult) return;
      const itemToCart: IcartItem = {
        _id: item._id!,
        referencia: item.Referencia,
        nombre: item.Nombre,
        retiro: formResult,
        imgURL: item.ImgRef,
      };
      this.cart.push(itemToCart);
    });
  }

  openCartDialog() {
    const dialogCartRef = this.MatDialog.open(CartItemsListDialogComponent, {
      data: this.cart,
      width: '600px',
    });
    dialogCartRef.afterClosed().subscribe(async (result: ISuccessRetiro) => {
      if (!result) return;
      if (result.itemsToIgnore.length > 0) {
        const CopyItemsFromCart: IInventory[] =
          this.SaveRecoverItemCopyFromCart('retrieve');

        result.itemsToIgnore.forEach((item) => {
          const itemIDX = this.InventoryFiltered.findIndex(
            (e) => e.Referencia === item.referencia
          );
          const itemBefore = CopyItemsFromCart.find(
            (f) => f.Referencia === item.referencia
          );

          this.InventoryFiltered[itemIDX] = itemBefore!;
        });
      }
      if (result.status === null) return;

      result.status
        ? this.InventoryNotificationService.toastNotification(
            'success',
            result.message
          )
        : this.InventoryNotificationService.toastNotification(
            'error',
            result.message
          );
      this.SaveRecoverItemCopyFromCart('deleteAll');
      this.cart = [];
      return;
    });
  }

  addInventarioToItem(reference: string, nombre: string, _id: string) {
    const dialogRef = this.MatDialog.open(AddToInventoryDialogComponent, {
      minHeight: '500px',
      width: '100%',
      data: {
        nombre,
        reference,
        _id,
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((res: { status: boolean; message: string }) => {
        if (!res) return;
        res.status === true
          ? this.InventoryNotificationService.toastNotification(
              'success',
              res.message
            )
          : this.InventoryNotificationService.toastNotification(
              'error',
              res.message
            );
      });
  }

  async openExcel(file: HTMLInputElement) {}

  deleteItem(itemID: string) {
    this.InventoryStore.deleteInventory(itemID);
  }

  SaveRecoverItemCopyFromCart(action: string, item?: IInventory) {
    const actions: any = {
      save: () => {
        const cartCopy: IInventory[] =
          JSON.parse(localStorage.getItem('cartCopy')!) || [];

        cartCopy.push(item!);
        localStorage.setItem('cartCopy', JSON.stringify(cartCopy));
      },
      retrieve: () => {
        return JSON.parse(localStorage.getItem('cartCopy')!);
      },
      delete: () => {
        let cartCopy: IInventory[] =
          JSON.parse(localStorage.getItem('cartCopy')!) || [];
        cartCopy = cartCopy.filter((f) => f!._id !== item!._id);
        localStorage.setItem('cartCopy', JSON.stringify(cartCopy));
      },
      deleteAll: () => {
        localStorage.setItem('cartCopy', JSON.stringify([]));
      },
    };

    return actions[action]();
  }

  openHistoryDialog(InventoryID: string) {
    this.MatDialog.open(InventoryHistoryDialogComponent, {
      data: InventoryID,
    });
  }
}
