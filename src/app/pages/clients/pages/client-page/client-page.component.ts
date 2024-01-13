import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICliente } from '../../interfaces/clientes.interface';
import { ClientsStoreService } from '../../services/clients.store.service';

@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.scss'],
})
export class ClientPageComponent implements OnInit {
  Cliente: ICliente | undefined = undefined;
  constructor(
    private ActivatedRoute: ActivatedRoute,
    private ClientStore: ClientsStoreService
  ) {}

  ngOnInit(): void {
    const id = this.ActivatedRoute.snapshot.paramMap.get('_id');
    this.ClientStore.getClient(id!).subscribe({
      next: (res) => {
        this.Cliente = res;
      },
    });
  }
}
