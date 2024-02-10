import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeadService } from '../../../../shared/services/Head.service';
import { IPresupuesto } from '../../interfaces/presupuesto.interface';
import { PresupuestoStoreService } from '../../services/presupuesto.store.service';
import { MatDialog } from '@angular/material/dialog';
import { FormPresupuestoComponent } from '../../components/form-presupuesto/form-presupuesto.component';
import { Page } from '../../../../interfaces/page';
import { PaginationService } from '../../../../shared/services/pagination.service';

@Component({
  selector: 'app-list-presupuestos',
  templateUrl: './list-presupuestos.component.html',
  styleUrls: ['./list-presupuestos.component.scss'],
})
export class ListPresupuestosComponent implements OnInit {
  Presupuestos: IPresupuesto[] = [];
  Pages: Page<IPresupuesto>[] = [];
  currentPage: Page<IPresupuesto> = this.Pages[0];

  constructor(
    private presupuestoStore: PresupuestoStoreService,
    private Router: Router,
    private HeadService: HeadService,
    private MatDialog: MatDialog,
    private PaginationService: PaginationService
  ) {
    this.HeadService.setTitle('Presupuestos');
    this.presupuestoStore.Presupuestos$.subscribe((presupuestos) => {
      this.Presupuestos = presupuestos;
      this.Pages = this.PaginationService.paginateData(presupuestos);
      this.currentPage = this.Pages[0];
    });
  }

  ngOnInit(): void {}

  goToPresupuesto(_id: string) {
    this.Router.navigate(['presupuestos', 'ver', _id]);
  }

  addPresupuesto(PresupuestoID?: string) {
    if (PresupuestoID) {
      this.Router.navigate([
        'presupuestos',
        'editar-presupuesto',
        PresupuestoID,
      ]);
      return;
    }
    this.MatDialog.open(FormPresupuestoComponent);
    return;
  }

  nextPage() {
    const pageNumber = this.currentPage.pageNumber + 1;
    const page = this.PaginationService.nextPage<IPresupuesto>(
      this.Pages,
      pageNumber
    );
    if (!page) return;

    this.currentPage = page;
  }

  setPage(pageNumber: number) {
    const page = this.PaginationService.setPage<IPresupuesto>(
      this.Pages,
      pageNumber
    );
    if (!page) return;
    this.currentPage = page;
  }

  previousPage() {
    const pageNumber = this.currentPage.pageNumber - 1;
    const page = this.PaginationService.previusPage<IPresupuesto>(
      this.Pages,
      pageNumber
    );

    if (!page) return;
    this.currentPage = page;
  }

  findPresupuesto(term: string) {
    const finded = this.Presupuestos.filter(
      (e) =>
        e.Cliente.nombre.toLowerCase().includes(term) ||
        e.Obra.toLowerCase().includes(term)
    );

    this.Pages = this.PaginationService.paginateData(finded);
    this.currentPage = this.Pages[0];

    if (term.length <= 0) {
      this.Pages = this.PaginationService.paginateData(finded);
      this.currentPage = this.Pages[0];
    }
  }
}
