import { Injectable } from '@angular/core';
import { ICliente } from '../interfaces/clientes.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  private API_URL = `${environment.server_uri}/clientes`;

  constructor(private _HTTP: HttpClient) {}

  getAllEmpresas() {
    return this._HTTP.get<ICliente[]>(`${this.API_URL}/all-clients`);
  }

  addNewClient(cliente: ICliente) {
    return this._HTTP.post<{ newClient: ICliente }>(
      `${this.API_URL}/add-new-client`,
      cliente
    );
  }

  editClient(Client: ICliente) {
    return this._HTTP.patch<{ message: string }>(
      `${this.API_URL}/edit-client`,
      Client
    );
  }

  deleteClient(clientID: string) {
    return this._HTTP.delete<{ message: string }>(
      `${this.API_URL}/delete-client/${clientID}`
    );
  }
}
