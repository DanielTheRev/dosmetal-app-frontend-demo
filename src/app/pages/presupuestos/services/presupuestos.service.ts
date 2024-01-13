import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IPresupuesto } from '../interfaces/presupuesto.interface';

@Injectable({
  providedIn: 'root',
})
export class PresupuestosService {
  private URL = `${environment.server_uri}/presupuestos`;

  constructor(private _HTTP: HttpClient) {}

  getAllPresupuestos() {
    return this._HTTP.get<IPresupuesto[]>(`${this.URL}/getPresupuestos`);
  }

  getPresupuesto(_id: string) {
    return this._HTTP.get<IPresupuesto>(`${this.URL}/getPresupuesto/${_id}`);
  }

  createPresupuesto(Presupuesto: IPresupuesto) {
    return this._HTTP.post<{ message: string; presupuesto: IPresupuesto }>(
      `${this.URL}/createPresupuesto`,
      Presupuesto
    );
  }

  saveChangesOnPresupuesto(Changes: IPresupuesto) {
    return this._HTTP.post<{
      presupuestoUpdated: IPresupuesto;
      message: string;
    }>(`${this.URL}/saveChangesOnPresupuesto`, Changes);
  }

  saveModifiedItem(data: { documentID: string; pagesData: any[] }) {
    return this._HTTP.post(`${this.URL}/saveModifiedItem`, data);
  }

  savePaymentDetails(data: {
    documentID: string;
    metodo: string;
    PlazoDeEntrega: string;
    LugarDeEntrega: string;
    ValidezDelPresupuesto: string;
  }) {
    return this._HTTP.post(`${this.URL}/savePaymentDetails`, data);
  }

  getDolarToday() {
    return this._HTTP.get<{ fecha: string; compra: string; venta: string }>(
      `https://cors-solucion.herokuapp.com/https://api-dolar-argentina.herokuapp.com/api/dolaroficial`
    );
  }

  deletePresupuesto(presupuestoID: string) {
    return this._HTTP.delete<{ message: string }>(
      `${this.URL}/deletePresupuesto/${presupuestoID}`
    );
  }
}
