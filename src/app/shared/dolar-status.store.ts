import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DolarStatusStoreService {
  private URL: string =
    'https://cors-solucion.herokuapp.com/https://api-dolar-argentina.herokuapp.com/api/';
  
  constructor(private _HTTP: HttpClient) {}

  getDolarStatus() {
    return
  }
}
