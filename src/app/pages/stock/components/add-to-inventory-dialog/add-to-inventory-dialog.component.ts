import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InventoryService } from '../../services/inventory.service';
import { InventoryStoreService } from '../../services/inventory.state.service';
import { InventoryNotificationService } from '../../services/inventoryNotification.service';
import { IInventoryItem } from '../../interfaces/stock.interface';

@Component({
  selector: 'app-add-to-inventory-dialog',
  templateUrl: './add-to-inventory-dialog.component.html',
  styleUrls: ['./add-to-inventory-dialog.component.scss'],
})
export class AddToInventoryDialogComponent implements OnInit {
  submitState = 'waiting';
  newStock: IInventoryItem[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: { nombre: string; reference: string; _id: string },
    private MatDialogRef: MatDialogRef<AddToInventoryDialogComponent>,
    private inventoryService: InventoryService,
    private inventoryNotification: InventoryNotificationService,
    private inventoryStore: InventoryStoreService
  ) {}

  ngOnInit(): void {}

  loadNewItems(data: { newStock: IInventoryItem[] }) {
    this.newStock = data.newStock;
  }

  submitData() {
    if (this.newStock.length <= 0) return;
    const newStock = {
      reference: this.data.reference,
      newStock: this.newStock,
      _id: this.data._id,
    };

    this.inventoryNotification
      .confirmAddToInventory(this.data.nombre, this.newStock)
      .then((e) => {
        if (e.isConfirmed) {
          this.submitState = 'submitted';
          this.inventoryService
            .addToInventory(newStock)
            .subscribe((res) => {
              this.submitState = 'waiting';
              if (res.status) {
                this.inventoryStore.addStockToInventoryOrEdit(
                  this.data._id,
                  res.newStock
                );
              }
              this.MatDialogRef.close({
                status: res.status,
                message: res.message,
              });
            });
          return;
        }
      });
  }
}
