import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICliente } from '../../interfaces/clientes.interface';
import { AddNewClientDialogComponent } from '../../components/add-new-client-dialog/add-new-client-dialog.component';
import { ClientsStoreService } from '../../services/clients.store.service';

@Component({
  selector: 'app-clients-page',
  templateUrl: './clients-page.component.html',
  styleUrls: ['./clients-page.component.scss'],
})
export class ClientsPageComponent implements OnInit {
  Clientes: ICliente[] = [];
  ClientesFilter: ICliente[] = [];

  constructor(
    private MatDialog: MatDialog,
    private ClienteStore: ClientsStoreService
  ) {}

  ngOnInit(): void {
    this.ClienteStore.Clients$.subscribe({
      next: (res) => {
        this.Clientes = res;
        this.ClientesFilter = res;
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
    this.ClientesFilter = this.Clientes.filter((e) =>
      e.nombre.toLowerCase().includes(term)
    );

    if (term.length <= 0) this.ClientesFilter = this.Clientes;
  }
}
