import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { News, PresentacionInfo } from '../interfaces/Presentacion.interface';

@Injectable({
  providedIn: 'root',
})
export class PresentacionService {
  private URI: string = `${environment.server_uri}/dosmetal-page/presentacion`;

  constructor(private _HTTP: HttpClient) {}

  getInfoPresentacion() {
    return this._HTTP.get<{ Presentacion: PresentacionInfo; NewsList: News[] }>(
      `${this.URI}/getInfoPresentacion`
    );
  }

  updateDescription(data: { _id: string; description: string }) {
    return this._HTTP.post<{ message: string }>(
      `${this.URI}/updateDescription`,
      data
    );
  }

  updateNewsData(data: {
    property: 'title' | 'description';
    value: string;
    _id?: string;
  }) {
    return this._HTTP.post<{ status: string }>(
      `${this.URI}/updateNewsData`,
      data
    );
  }

  updateImage(file: File, data: { _id: string; imgID: string }) {
    const formData = new FormData();
    formData.append('imgFile', file);
    formData.append('_id', data._id);
    formData.append('imgID', data.imgID);
    return this._HTTP.post<{
      message: string;
      banner_updated: PresentacionInfo;
    }>(`${this.URI}/updateImage`, formData);
  }

  // getNews() {
  //   return this._HTTP.get<News[]>(`${this.URI}/getNews`);
  // }

  createNews(data: { title: string; description: string }) {
    return this._HTTP.post<{ message: string; NewsSaved: News }>(
      `${this.URI}/createNews`,
      data
    );
  }
  updateNewsImage(File: File, data: { _id: string; imgID: string }) {
    const formData = new FormData();
    formData.append('imgFile', File);
    formData.append('_id', data._id);
    formData.append('imgID', data.imgID);
    return this._HTTP.post<{ message: string; NewsUpdated: News }>(
      `${this.URI}/updateNewsImage`,
      formData
    );
  }
}
