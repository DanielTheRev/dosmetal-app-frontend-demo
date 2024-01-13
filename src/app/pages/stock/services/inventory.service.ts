import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { IInventory, IRetiro } from '../interfaces/stock.interface';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private API_URL = `${environment.server_uri}/inventory`;

  constructor(private _HTTP: HttpClient) {}

  getAllInventory() {
    return this._HTTP.get<IInventory[]>(`${this.API_URL}/all-inventory`);
  }

  addNewInventory(itemToAdd: IInventory, imgFile: File) {
    const body = new FormData();
    body.append('imgFile', imgFile);
    body.append('itemToAdd', JSON.stringify(itemToAdd));

    return this._HTTP.post<{
      status: string;
      message: string;
      item: IInventory;
    }>(`${this.API_URL}/add-new-inventory`, body);
  }

  editInventory(Item: IInventory, imgFile?: File) {
    const body = new FormData();
    body.append('imgFile', imgFile!);
    body.append('itemToAdd', JSON.stringify(Item));
    return this._HTTP.put<{ item: IInventory; message: string }>(
      `${this.API_URL}/edit-inventory-data`,
      body
    );
  }

  removeFromInventory(cart: IRetiro) {
    return this._HTTP.post<{ status: boolean; message: string }>(
      `${this.API_URL}/remove-from-inventory`,
      cart
    );
  }

  addToInventory(newStock: {
    reference: string;
    newStock: any[];
    _id: string;
  }) {
    return this._HTTP.post<{
      status: boolean;
      message: string;
      newStock: IInventory;
    }>(`${this.API_URL}/add-to-inventory`, newStock);
  }

  deleteFromInventory(_ID: string) {
    return this._HTTP.delete<{ status: boolean; message: string }>(
      `${this.API_URL}/delete-inventory/${_ID}`
    );
  }

  changeMinumumStock(itemID: string, newMinumum: number) {
    return this._HTTP.post<{ message: string; itemWithChanges: IInventory }>(
      `${this.API_URL}/change-minumum-stock`,
      { itemID, newMinumum }
    );
  }

  getInventoryHistory(InventoryID: string) {
    return this._HTTP.get<{ date: number; detail: string; in: boolean }[]>(
      `${this.API_URL}/history/${InventoryID}`
    );
  }
}
