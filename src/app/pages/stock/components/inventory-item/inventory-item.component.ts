import { Component, Input, OnInit } from '@angular/core';
import { IInventoryItem } from 'src/app/pages/stock/interfaces/stock.interface';

@Component({
  selector: 'app-inventory-item',
  templateUrl: './inventory-item.component.html',
  styleUrls: ['./inventory-item.component.scss']
})
export class InventoryItemComponent implements OnInit {
  @Input() inventory!: IInventoryItem;

  constructor() { }

  ngOnInit(): void {
  }

}
