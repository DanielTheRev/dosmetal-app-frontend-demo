import { Component, OnInit, Renderer2, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { IBuyOrder } from '../../interface/orden-compra.interface';
import { BuyOrderStoreService } from '../../services/buy-order.store';

import { HeadService } from '../../../../shared/services/Head.service';

@Component({
  selector: 'app-orden-list',
  templateUrl: './orden-list.component.html',
  styleUrls: ['./orden-list.component.scss'],
})
export class OrdenListComponent implements OnInit {
  BuyOrders: {
    isEmpty: boolean;
    data: IBuyOrder[];
  } = {
    isEmpty: true,
    data: [],
  };

  BuyOrdersFiltered: {
    isEmpty: boolean;
    data: IBuyOrder[];
  } = {
    isEmpty: true,
    data: [],
  };

  constructor(
    private BuyOrderStore: BuyOrderStoreService,
    private Router: Router,
    private Renderer2: Renderer2,
    private HeadService: HeadService,
    private NgZone: NgZone
  ) {
    this.HeadService.setTitle('Ordenes de compra');
    this.BuyOrderStore.BuyOrders$.subscribe({
      next: (res) => {
        this.BuyOrders = res;
        this.BuyOrdersFiltered = res;
      },
    });
  }

  ngOnInit(): void {}

  searchBuyOrder(word: HTMLInputElement) {
    const value = word.value;

    if (value.length <= 0) {
      this.Renderer2.setProperty(word, 'value', '');
      this.BuyOrdersFiltered = this.BuyOrders;
      return;
    }
    const search = this.BuyOrders.data.filter(
      (e) =>
        e.CompanyName.toLowerCase().startsWith(value.toLowerCase()) ||
        e.OrderNo.toString().startsWith(value)
    );
    this.BuyOrdersFiltered = {
      isEmpty: search.length <= 0,
      data: search,
    };
    return;
  }

  createOrder() {
    this.Router.navigate(['ordenesCompra', 'crear-order-pago']);
  }

  goToBuyOrder(ID: string) {
    const doc = document as any;
    doc.startViewTransition(() => {
      this.NgZone.run(() => {
        this.Router.navigate(['ordenesCompra', 'orden', ID]);
      });
    });
  }

  deleteBuyOrder(ID: string) {
    this.BuyOrderStore.deleteBuyOrder(ID);
  }
}
