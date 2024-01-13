import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-inventory-history-dialog',
  templateUrl: './inventory-history-dialog.component.html',
  styleUrls: ['./inventory-history-dialog.component.scss']
})
export class InventoryHistoryDialogComponent implements OnInit {
  Events: { date: number; detail: string, in: boolean }[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public InventoryID: string,
    private inventoryService: InventoryService
  ) {}

  ngOnInit(): void {
    // this.stockService.getItemHistory(this.DATA._id!).subscribe(e => this.Events = e.historial);
    this.inventoryService.getInventoryHistory(this.InventoryID).subscribe(e => this.Events = e);
  }

}
