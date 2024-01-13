import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  NgZone,
} from '@angular/core';
import { Router } from '@angular/router';
import { ICliente } from '../../interfaces/clientes.interface';
import { ClientsStoreService } from '../../services/clients.store.service';

@Component({
  selector: 'app-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.scss'],
})
export class ClientsTableComponent implements OnInit {
  @Input() Clientes: ICliente[] = [];
  @Output('EditClientID') EditClientData = new EventEmitter<ICliente>();

  constructor(
    private Router: Router,
    private ClientStore: ClientsStoreService,
    private NgZone: NgZone
  ) {}

  ngOnInit(): void {}

  goToClient(_id: string) {
    const doc = document as any;
    doc.startViewTransition(() => {
      this.NgZone.run(() => {
        this.Router.navigate(['clients', 'ver', _id]);
      });
    });
  }

  editClient(client: ICliente) {
    this.EditClientData.emit(client);
  }

  deleteClient(_id: string) {
    this.ClientStore.removeClient(_id);
  }
}
