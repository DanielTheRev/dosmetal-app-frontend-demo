import { Component, OnInit } from '@angular/core';
import { HeadService } from '../../../../shared/services/Head.service';

import { InventoryStoreService } from '../../services/inventory.state.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  lowStock: number = 0;
  constructor(
    private InventoryStore: InventoryStoreService,
    private HeadService: HeadService
  ) {}

  ngOnInit(): void {
    this.HeadService.setTitle('Inventario')
    this.InventoryStore.inventory$.subscribe(
      (e) =>
        (this.lowStock = e.filter(
          (f) => f.InventoryState === 'Poco Stock'
        ).length)
    );
  }
}
