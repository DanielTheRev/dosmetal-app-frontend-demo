import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RetirosService {
  private URL = `${environment.server_uri}/retiros`;

  constructor(private _http: HttpClient) {}

  getTodayRetiros() {
    return this._http.get<any>(`${this.URL}/getToday`);
  }

  getMonthsRetiros() {
    return this._http.get<any>(`${this.URL}/getMonths`);
  }

  getEspecificDay(data: any) {
    return this._http.post<any>(`${this.URL}/especificDay`, data);
  }

  setRetiros(retiro: any) {
    return this._http.post(
      `${environment.server_uri}/dosmetal/api/stock/retirar`,
      retiro
    );
  }
}
