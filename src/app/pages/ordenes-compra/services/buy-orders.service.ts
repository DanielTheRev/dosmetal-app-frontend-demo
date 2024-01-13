import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IBuyOrder } from '../interface/orden-compra.interface';

@Injectable({
  providedIn: 'root',
})
export class BuyOrderService {
  private URI = `${environment.server_uri}/orden-compras`;

  constructor(private _HTTP: HttpClient) {}

  getAllOrders() {
    return this._HTTP.get<{ isEmpty: boolean; data: IBuyOrder[] }>(
      `${this.URI}/all-orders`
    );
  }

  createOrder(BuyOrder: IBuyOrder) {
    return this._HTTP.post<{ order: IBuyOrder }>(
      `${this.URI}/create-order`,
      BuyOrder
    );
  }

  deleteBuyOrder(ID: string) {
    return this._HTTP.delete<{ message: string }>(`${this.URI}/delete/${ID}`);
  }
}
