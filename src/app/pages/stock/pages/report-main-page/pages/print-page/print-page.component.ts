import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  NgZone,
} from '@angular/core';
import { IInventory } from 'src/app/pages/stock/interfaces/stock.interface';
import { SafeResourceUrl } from '@angular/platform-browser';
import { ReportComponent } from '../../components/report/report.component';
import { PdfService } from '../../../../../../../app/shared/services/pdf.service';

@Component({
  selector: 'app-print-page',
  templateUrl: './print-page.component.html',
  styleUrls: ['./print-page.component.scss'],
})
export class PrintPageComponent implements OnInit {
  @Input('Report') Report: { name: string; data: IInventory[] } | null = null;
  @Output('GeneratingPDF') GeneratingPDF = new EventEmitter<boolean>();
  @ViewChild('ReportComponent') ReportComp!: ReportComponent;

  PdfURL: SafeResourceUrl | null = null;
  showPrintBtn = true;

  constructor(private NGZone: NgZone, private PdfService: PdfService) {}

  ngOnInit(): void {}

  ToggleShowList() {
    const doc = document as any;
    doc.startViewTransition(() => {
      this.NGZone.run(() => {
        this.GeneratingPDF.emit(false);
      });
    });
  }

  async Download(action: 'Print' | 'Download') {
    const name = `Reporte de stock ${new Date().toLocaleDateString()}`;
    const element = this.ReportComp.ReportEl.nativeElement;
    const res = await this.PdfService.GetPdf({
      action,
      element,
      name,
      totalPages: 2,
    });
    this.PdfURL = res.Url;
    setTimeout(() => {
      const pdf_el = document.querySelector('#pdf-view');
      pdf_el?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }, 0.5);
  }
}
