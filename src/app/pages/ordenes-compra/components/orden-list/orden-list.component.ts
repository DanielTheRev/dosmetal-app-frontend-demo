import { Component, OnInit, Renderer2, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { IBuyOrder } from '../../interface/orden-compra.interface';
import { BuyOrderStoreService } from '../../services/buy-order.store';

import { HeadService } from '../../../../shared/services/Head.service';
import { Page } from '../../../../interfaces/page';
import { PaginationService } from '../../../../shared/services/pagination.service';

@Component({
  selector: 'app-orden-list',
  templateUrl: './orden-list.component.html',
  styleUrls: ['./orden-list.component.scss'],
})
export class OrdenListComponent implements OnInit {
  BuyOrders: IBuyOrder[] = [];

  Pages: Page<IBuyOrder>[] = [];
  currentPage: Page<IBuyOrder> = this.Pages[0];

  constructor(
    private BuyOrderStore: BuyOrderStoreService,
    private Router: Router,
    private PaginationService: PaginationService,
    private HeadService: HeadService,
    private NgZone: NgZone
  ) {
    this.HeadService.setTitle('Ordenes de compra');
    this.BuyOrderStore.BuyOrders$.subscribe({
      next: (res) => {
        this.BuyOrders = res;
        this.Pages = this.PaginationService.paginateData(res);
        this.currentPage = this.Pages[0];
      },
    });
  }

  ngOnInit(): void {}

  searchBuyOrder(word: HTMLInputElement) {
    const value = word.value;

    if (value.length <= 0) return;

    const search = this.BuyOrders.filter(
      (e) =>
        e.CompanyName.toLowerCase().startsWith(value.toLowerCase()) ||
        e.OrderNo.toString().startsWith(value)
    );
    this.Pages = this.PaginationService.paginateData(search);
    this.currentPage = this.Pages[0];
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

  nextPage() {
    const pageNumber = this.currentPage.pageNumber + 1;
    const page = this.PaginationService.nextPage<IBuyOrder>(
      this.Pages,
      pageNumber
    );
    if (!page) return;

    this.currentPage = page;
  }

  setPage(pageNumber: number) {
    const page = this.PaginationService.setPage<IBuyOrder>(
      this.Pages,
      pageNumber
    );
    if (!page) return;
    this.currentPage = page;
  }

  previousPage() {
    const pageNumber = this.currentPage.pageNumber - 1;
    const page = this.PaginationService.previusPage<IBuyOrder>(
      this.Pages,
      pageNumber
    );

    if (!page) return;
    this.currentPage = page;
  }
}
