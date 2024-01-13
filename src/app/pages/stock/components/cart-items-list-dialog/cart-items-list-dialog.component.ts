import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IcartItem, IRetiro } from '../../interfaces/stock.interface';
import { WebSocketService } from '../../../../shared/services/websocket.service';
import { InventoryService } from '../../services/inventory.service';
import { InventoryNotificationService } from '../../services/inventoryNotification.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-cart-items-list-dialog',
  templateUrl: './cart-items-list-dialog.component.html',
  styleUrls: ['./cart-items-list-dialog.component.scss'],
})
export class CartItemsListDialogComponent implements OnInit {
  state: any = 'waiting';

  formData: FormGroup = this.fb.group({
    paraQuienRetira: ['', Validators.required],
    nombreQuienRetira: ['', Validators.required],
  });
  itemsToNoChange: IcartItem[] = [];
  Environment = environment.server_uri;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IcartItem[] = [],
    private MatDialogRef: MatDialogRef<CartItemsListDialogComponent>,
    private fb: FormBuilder,
    private InventoryService: InventoryService,
    private InventoryNotificationService: InventoryNotificationService,
    private webSockets: WebSocketService
  ) {}

  ngOnInit(): void {
    this.MatDialogRef.backdropClick().subscribe((res) => {
      this.MatDialogRef.close({
        status: null,
        itemsToIgnore: this.itemsToNoChange,
      });
    });
  }

  getControl(control: string) {
    return this.formData.controls[control];
  }

  deleteItemFromCart(item: IcartItem, idx: number) {
    this.itemsToNoChange.push(item);
    this.data.splice(idx, 1);
    if (this.data.length <= 0) {
      this.MatDialogRef.close({
        status: null,
        itemsToIgnore: this.itemsToNoChange,
      });
    }
  }

  SubmitData() {
    if (this.formData.invalid) return;
    const retiro: IRetiro = {
      ...this.formData.value,
      itemsToIgnore: this.itemsToNoChange,
      itemsRetirados: this.data,
    };

    this.InventoryNotificationService.ConfirmRemoveInventory(retiro).then(
      (e) => {
        if (e.isConfirmed) {
          this.state = 'submitted';
          this.InventoryService.removeFromInventory(retiro).subscribe((res) => {
            this.state = 'waiting';
            this.MatDialogRef.close({
              itemsToIgnore: retiro.itemsToIgnore,
              ...res,
            });
          });
        }
      }
    );
  }
}
