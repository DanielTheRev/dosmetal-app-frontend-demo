import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  IBuyOrder,
  IProductOrder,
} from '../../interface/orden-compra.interface';
import { PdfService } from '../../../../../app/shared/services/pdf.service';

interface IPage {
  pageNumber: number;
  pageData: IProductOrder[];
  isActual: boolean;
  showFooter: boolean;
}

@Component({
  selector: 'app-buy-order',
  templateUrl: './buy-order.component.html',
  styleUrls: ['./buy-order.component.scss'],
})
export class BuyOrderComponent implements OnInit {
  @Input('Order') BuyOrder!: IBuyOrder;
  @ViewChild('ordenDeCompra') OrdenDeCompraEL!: ElementRef<HTMLDivElement>;
  Pages: IPage[] = [
    {
      pageNumber: 1,
      isActual: true,
      showFooter: true,
      pageData: [],
    },
  ];

  constructor(private PdfService: PdfService) {}

  ngOnInit(): void {
    this.Pages = this.PdfService.CreatePdf({
      type: 'BuyOrder',
      items: this.BuyOrder.Products,
      maxBoxSize: { min: 750, max: 1100 },
    });
  }
}
