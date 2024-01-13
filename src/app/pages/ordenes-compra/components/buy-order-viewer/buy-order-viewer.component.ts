import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IBuyOrder } from '../../interface/orden-compra.interface';
import { BuyOrderStoreService } from '../../services/buy-order.store';
import { BuyOrderComponent } from '../buy-order/buy-order.component';
import { PdfService } from '../../../../../app/shared/services/pdf.service';

@Component({
  selector: 'app-buy-order-viewer',
  templateUrl: './buy-order-viewer.component.html',
  styleUrls: ['./buy-order-viewer.component.scss'],
})
export class BuyOrderViewerComponent implements OnInit {
  @ViewChild('ordenDeCompra') BuyOrderComp!: BuyOrderComponent;
  objURL: any;
  BuyOrder: IBuyOrder | undefined;

  constructor(
    private BuyOrderStore: BuyOrderStoreService,
    private ActivatedRouter: ActivatedRoute,
    private Location: Location,
    private PdfService: PdfService
  ) {
    this.BuyOrderStore.BuyOrders$.subscribe({
      next: (Orders) => {
        const ID = this.ActivatedRouter.snapshot.params['id'];
        if (Orders.isEmpty) return;
        this.BuyOrder = Orders.data.find((e) => e._id === ID);
      },
    });
  }

  ngOnInit(): void {}

  async showPrintableElement(action: 'Download' | 'Print') {
    const element = this.BuyOrderComp.OrdenDeCompraEL.nativeElement;
    const totalPages = this.BuyOrderComp.Pages.length;
    const res = await this.PdfService.GetPdf({
      action,
      element,
      name: this.BuyOrder?.CompanyName!,
      totalPages,
    });
    this.objURL = res.Url;
    setTimeout(() => {
      const el = document.querySelector('#pdf-view');
      el?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }, 0.5);

    // const doc = new jsPDF('p', 'px', 'a4');
    // const margin = 10;
    // const scale =
    //   (doc.internal.pageSize.width - margin * 2) /
    //   this.BuyOrderComp.OrdenDeCompraEL.nativeElement.scrollWidth;

    // doc.html(this.BuyOrderComp.OrdenDeCompraEL.nativeElement, {
    //   html2canvas: {
    //     scale: scale,
    //   },
    //   x: 10,
    //   y: 1,
    //   autoPaging: 'slice',
    //   callback: () => {
    //     doc.deletePage(this.BuyOrderComp.Pages.length + 1);
    //     const blob = doc.output('blob');
    //     if (action === 'print') {
    //       const objURL = window.URL.createObjectURL(blob);
    //       this.objURL =
    //         this.DomSaninitizer.bypassSecurityTrustResourceUrl(objURL);
    //       setTimeout(() => {
    //         const el = document.querySelector('#pdf-view');
    //         el?.scrollIntoView({
    //           behavior: 'smooth',
    //           block: 'center',
    //           inline: 'center',
    //         });
    //       }, 0.5);
    //       return;
    //     }

    //     if (action === 'download') {
    //       doc.save(`Orden de compra Nro ${this.BuyOrder?.OrderNo}`);
    //       return;
    //     }
    //   },
    // });
  }

  goToPreviusPage() {
    const doc = document as any;
    doc.startViewTransition(() => {
      this.Location.back();
    });
    return;
  }
}
