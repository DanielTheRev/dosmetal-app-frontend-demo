import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { IInventory } from 'src/app/pages/stock/interfaces/stock.interface';
import { InventoryStoreService } from '../../services/inventory.state.service';
import { environment } from '../../../../../environments/environment';

import Swal from 'sweetalert2';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-report-main-page',
  templateUrl: './report-main-page.component.html',
  styleUrls: ['./report-main-page.component.scss'],
})
export class ReportMainPageComponent implements OnInit {
  generatingPDF: boolean = false;
  PdfURL: SafeResourceUrl | null = null;
  @ViewChild('report') report!: ElementRef<HTMLDivElement>;

  Environment = environment;
  tabs = [
    { name: 'Stock por terminarse', active: true, data: [] as IInventory[] },
    { name: 'Stock terminado', active: false, data: [] as IInventory[] },
  ];
  tabSelected: (typeof this.tabs)[0] = this.tabs[0];
  constructor(
    private inventoryStore: InventoryStoreService,
    private NGZone: NgZone
  ) {}

  ngOnInit(): void {
    this.inventoryStore.inventory$.subscribe((res) => {
      this.tabs[0].data = res.filter((e) => e.InventoryState === 'Poco Stock');
      this.tabs[1].data = res.filter((e) => e.InventoryState === 'Sin Stock');
    });
  }

  changeTab(tab_i: number) {
    this.tabs = this.tabs.map((tab, i) => {
      tab.active = false;
      if (tab_i === i) {
        tab.active = true;
        this.tabSelected = tab;
      }
      return tab;
    });
  }

  imprimir(action: string) {
    const doc = document as any;
    doc.startViewTransition(() => {
      this.NGZone.run(() => {
        this.generatingPDF = !this.generatingPDF;
      });
    });
  }

  changeMinimumUnits(itemID: string) {
    Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success  btn-sm me-1',
        cancelButton: 'btn btn-danger btn-sm ',
        input: 'form-control form-control-sm h-50 w-75 mx-auto',
      },
      buttonsStyling: false,
    })
      .fire({
        text: 'Cual es el nuevo monto minimo de unidades?',
        input: 'number',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        allowOutsideClick: false,
        heightAuto: false,
      })
      .then((res) => {
        if (res.isConfirmed) {
          this.inventoryStore.changeMinumumStock(itemID, res.value);
        }
      });
  }

  removeFromList(id: string, target: string) {
    // if (target == 'lowStock') {
    //   this.lowStock = this.lowStock.filter((e) => e._id !== id);
    //   return;
    // }
    // this.outStock = this.outStock.filter((e) => e._id !== id);
  }
}
