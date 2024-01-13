import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import jsPDF from 'jspdf';
import { PreviewPresupuestoComponent } from './components/preview-presupuesto/preview-presupuesto.component';
import { PdfService } from '../../../../../app/shared/services/pdf.service';

@Component({
  selector: 'app-presupuestos-viewer',
  templateUrl: './presupuestos-viewer.component.html',
  styleUrls: ['./presupuestos-viewer.component.scss'],
})
export class PresupuestosViewerComponent implements OnInit {
  @ViewChild('pdfView') pdfView!: ElementRef<HTMLEmbedElement>;
  @ViewChild('Pdf') Pdf!: PreviewPresupuestoComponent;
  loading = false;
  objUrl: any;

  constructor(private PdfService: PdfService) {}

  ngOnInit(): void {}

  showPresupuesto() {
    this.Pdf.PdfDocument.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
  }

  async showPrintableElement(data: {
    documentName: string;
    action: 'Download' | 'Print';
    totalPages: number;
  }) {
    const element = this.Pdf.PdfDocument.nativeElement;
    const res = await this.PdfService.GetPdf({
      action: data.action,
      element,
      name: data.documentName,
      totalPages: data.totalPages,
    });
    this.objUrl = res.Url;
    setTimeout(() => {
      const el = document.querySelector('#pdf-view');
      el?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }, 0.5);

    // const margin = 10;
    // const scale =
    //   (doc.internal.pageSize.width - margin * 2) /
    //   this.Pdf.PdfDocument.nativeElement.scrollWidth;

    // doc.html(this.Pdf.PdfDocument.nativeElement, {
    //   html2canvas: {
    //     scale: scale,
    //   },
    //   x: 5,
    //   y: 1,
    //   autoPaging: 'slice',
    //   callback: () => {
    //     const blob = doc.output('blob');
    //     if (data.action === 'Print') {
    //       const objURL = window.URL.createObjectURL(blob);
    //       this.objUrl =
    //         this.DomSaninitzer.bypassSecurityTrustResourceUrl(objURL);
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

    //     if (data.action === 'Download') {
    //       doc.save(data.documentName);
    //       return;
    //     }
    //   },
    // });
  }
}
