import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HomeBanner } from '../interfaces/home-banner.interface';

@Injectable({
  providedIn: 'root',
})
export class HomeBannerService {
  private URI: string = `${environment.server_uri}/dosmetal-page/homeBanner`;

  constructor(private _HTTP: HttpClient) {}

  getHomeBanners() {
    return this._HTTP.get<HomeBanner[]>(`${this.URI}/getHomeBanners`);
  }

  editHomeBannerDescription(data: { _id: string; description: string }) {
    return this._HTTP.patch<{
      status: boolean;
      message: string;
      bannerSaved: HomeBanner;
    }>(`${this.URI}/editHomeBannerDescription`, data);
  }

  editHomeBannerImage(image: File, _id: string, banner: string, imgID: string) {
    const formData = new FormData();
    formData.append('imgFile', image);
    formData.append('_id', _id);
    formData.append('banner', banner);
    formData.append('imgID', imgID);
    return this._HTTP.patch<{ status: string; bannerSaved: HomeBanner }>(
      `${this.URI}/editHomeBannerImg`,
      formData
    );
  }
}
