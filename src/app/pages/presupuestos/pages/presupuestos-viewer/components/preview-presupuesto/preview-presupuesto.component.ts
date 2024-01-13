import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPresupuesto } from '../../../../interfaces/presupuesto.interface';
import { PresupuestoStoreService } from '../../../../services/presupuesto.store.service';
import { Location } from '@angular/common';
import { PdfService } from '../../../../../../../app/shared/services/pdf.service';

interface Item {
  Descripcion: string;
  Precio: string;
}

interface IPage {
  pageNumber: number;
  pageData: Item[];
  isActual: boolean;
  showFooter: boolean;
}
@Component({
  selector: 'app-preview-presupuesto',
  templateUrl: './preview-presupuesto.component.html',
  styleUrls: ['./preview-presupuesto.component.scss'],
})
export class PreviewPresupuestoComponent implements OnInit {
  Paginas: IPage[] = [];
  isProduction = false;
  Presupuesto!: IPresupuesto;
  @ViewChild('PdfDocument') PdfDocument!: ElementRef<HTMLDivElement>;
  @Output('PrintDocument') private PrintDocument = new EventEmitter<{
    documentName: string;
    action: 'Download' | 'Print';
    totalPages: number;
  }>();
  constructor(
    private PresupuestoStore: PresupuestoStoreService,
    private ActivatedRoute: ActivatedRoute,
    private location: Location,
    private PdfService: PdfService
  ) {
    const PresupuestoID = this.ActivatedRoute.snapshot.params['_id'];
    this.PresupuestoStore.Presupuestos$.subscribe((presupuesto) => {
      this.Presupuesto = presupuesto.find((e) => e._id === PresupuestoID)!;
      if (!this.Presupuesto) return;
      this.Paginas = this.PdfService.CreatePdf({
        type: 'Presupuesto',
        items: this.Presupuesto.Items,
        maxBoxSize: { min: 700, max: 900 },
      });
    });
  }

  ngOnInit(): void {}

  goBack() {
    const doc = document as any;
    doc.startViewTransition(() => {
      this.location.back();
    });
  }

  Print(action: 'Download' | 'Print') {
    this.PrintDocument.emit({
      documentName: `${this.Presupuesto.Cliente.nombre} - ${this.Presupuesto.Obra}`,
      action,
      totalPages: this.Paginas.length,
    });
  }
}
