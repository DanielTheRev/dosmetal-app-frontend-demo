import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContactPrespuesto } from '../interfaces/contactPrespuesto.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private URI: string = `${environment.server_uri}/dosmetal-page/contactPresupuesto`;
  constructor(private _http: HttpClient) {}

  getContactPresupuesto() {
    return this._http.get<ContactPrespuesto[]>(
      `${this.URI}/getAllContactPresupuesto`
    );
  }
}
