import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import jsPDF from 'jspdf';

interface IPage {
  pageNumber: number;
  pageData: any[];
  isActual: boolean;
  showFooter: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  constructor(private DomSaninitizer: DomSanitizer) {}

  CreatePdf(data: {
    type: 'BuyOrder' | 'Presupuesto';
    items: any[];
    maxBoxSize: { min: number; max: number };
  }) {
    return this.FillItems(data);
  }

  GetPdf(data: {
    element: HTMLDivElement;
    totalPages: number;
    action: 'Download' | 'Print';
    name: string;
  }) {
    const doc = new jsPDF('p', 'px', 'a4');
    const margin = 10;
    const scale =
      (doc.internal.pageSize.width - margin * 2) / data.element.scrollWidth;

    return new Promise<{ Url: SafeResourceUrl }>((resolve, reject) => {
      doc.html(data.element, {
        html2canvas: {
          scale: scale,
        },
        x: 10,
        y: 1,
        autoPaging: 'slice',
        filename: data.name,
        callback: () => {
          doc.deletePage(data.totalPages + 1);
          const blob = doc.output('blob');
          if (data.action === 'Print') {
            const objURL = window.URL.createObjectURL(blob);
            return resolve({
              Url: this.DomSaninitizer.bypassSecurityTrustResourceUrl(objURL),
            });
          }

          if (data.action === 'Download') {
            doc.save(data.name);
            return resolve({ Url: '' });
          }
        },
      });
    });
  }

  private FillItems(data: {
    type: 'BuyOrder' | 'Presupuesto';
    items: any[];
    maxBoxSize: { min: number; max: number };
  }) {
    const Pages: IPage[] = [
      {
        isActual: true,
        pageData: [],
        pageNumber: 1,
        showFooter: true,
      },
    ];
    data.items.forEach((item) => {
      let page_idx = Pages.findIndex((e) => e.isActual);
      const page_number = Pages[page_idx].pageNumber;
      const max_box_size =
        page_number === 1 ? data.maxBoxSize.min : data.maxBoxSize.max;
      const box_sizing = this.getTableSize({
        type: data.type,
        items: Pages[page_idx].pageData,
      });
      if (max_box_size - box_sizing >= 45) {
        Pages[page_idx].pageData.push(item);
        return;
      }

      Pages[page_idx].isActual = false;
      Pages[page_idx].showFooter = false;

      const new_page: IPage = {
        pageNumber: Pages.length + 1,
        pageData: [item],
        isActual: true,
        showFooter: true,
      };
      Pages.push(new_page);
      return;
    });
    return Pages;
  }

  private getTableSize(data: {
    type: 'BuyOrder' | 'Presupuesto';
    items: any[];
  }) {
    const Property_types = {
      BuyOrder: 'Product',
      Presupuesto: 'Descripcion',
    };
    
    let box_size = 0;
    data.items.forEach((item) => {
      const line_height = 45;
      const cant_lineas = Math.ceil(
        item[Property_types[data.type]].trim().length / 95
      );
      let box_height = (line_height * cant_lineas) / 2 + 4;
      if (cant_lineas <= 1 || item[Property_types[data.type]].length <= 0) {
        box_height = 45;
      }
      box_size += box_height;
    });

    return box_size;
  }
}
