import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICliente } from '../../interfaces/clientes.interface';
import { AddNewClientDialogComponent } from '../../components/add-new-client-dialog/add-new-client-dialog.component';
import { ClientsStoreService } from '../../services/clients.store.service';
import { Page } from 'src/app/interfaces/page';
import { PaginationService } from 'src/app/shared/services/pagination.service';

@Component({
  selector: 'app-clients-page',
  templateUrl: './clients-page.component.html',
  styleUrls: ['./clients-page.component.scss'],
})
export class ClientsPageComponent implements OnInit {
  Clientes: ICliente[] = [];
  Pages: Page<ICliente>[] = [];
  currentPage: Page<ICliente> = this.Pages[0];
  constructor(
    private MatDialog: MatDialog,
    private ClienteStore: ClientsStoreService,
    private PaginationService: PaginationService
  ) {}

  ngOnInit(): void {
    this.ClienteStore.Clients$.subscribe({
      next: (res) => {
        this.Clientes = res;
        this.Pages = this.PaginationService.paginateData(res);
        this.currentPage = this.Pages[0];
      },
    });
  }

  addNewClient() {
    const dialogRef = this.MatDialog.open(AddNewClientDialogComponent, {
      maxWidth: '500px',
    });
  }

  openEditClientForm(Client: ICliente) {
    const dialogRef = this.MatDialog.open(AddNewClientDialogComponent, {
      maxWidth: '500px',
      data: Client,
    });
  }

  findCliente(term: string) {
    const finded = this.Clientes.filter((e) =>
      e.nombre.toLowerCase().includes(term)
    );

    this.Pages = this.PaginationService.paginateData(finded);
    this.currentPage = this.Pages[0];

    if (term.length <= 0) this.PaginationService.paginateData(this.Clientes);
  }

  nextPage() {
    const pageNumber = this.currentPage.pageNumber + 1;
    const page = this.PaginationService.nextPage<ICliente>(
      this.Pages,
      pageNumber
    );
    if (!page) return;

    this.currentPage = page;
  }

  setPage(pageNumber: number) {
    const page = this.PaginationService.setPage<ICliente>(
      this.Pages,
      pageNumber
    );
    if (!page) return;
    this.currentPage = page;
  }

  previousPage() {
    const pageNumber = this.currentPage.pageNumber - 1;
    const page = this.PaginationService.previusPage<ICliente>(
      this.Pages,
      pageNumber
    );

    if (!page) return;
    this.currentPage = page;
  }
}
