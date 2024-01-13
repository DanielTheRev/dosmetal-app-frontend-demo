import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-stock-item-details',
  templateUrl: './stock-item-details.component.html',
  styleUrls: ['./stock-item-details.component.scss'],
})
export class StockItemDetailsComponent implements OnInit {
  Events: { date: number; detail: string, in: boolean }[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public InventoryID: string,
    private inventoryService: InventoryService
  ) {}

  ngOnInit(): void {
    // this.stockService.getItemHistory(this.DATA._id!).subscribe(e => this.Events = e.historial);
    this.inventoryService.getInventoryHistory(this.InventoryID).subscribe(console.log);
  }
}
