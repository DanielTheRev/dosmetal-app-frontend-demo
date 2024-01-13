import { Component, Input } from '@angular/core';
import { News } from 'src/app/pages/page-dashboard/interfaces/Presentacion.interface';
import { PresentacionService } from 'src/app/pages/page-dashboard/services/presentacion.service';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss'],
})
export class NewsItemComponent {
  @Input('NewsItem') NewsItem!: News;
  OnEditNews = false;
  OnEditNewsTitle = false;
  constructor(private PresentacionService: PresentacionService) {}

  saveDescription(data: {
    property: 'title' | 'description';
    value: string;
    _id?: string;
  }) {
    this.PresentacionService.updateNewsData({
      property: data.property,
      value: data.value,
      _id: data._id,
    }).subscribe({
      next: (res) => {
        this.OnEditNews = false;
        this.OnEditNewsTitle = false;
        alert('Actualizado con exito');
      },
    });
  }

  loadImage(ev: any, imgID: string, newID: string) {
    const file = ev.target.files[0] as File;
    this.PresentacionService.updateNewsImage(file, {
      _id: newID,
      imgID,
    }).subscribe({
      next: (res) => {
        this.NewsItem.images = res.NewsUpdated.images;
        alert('Imagen guardada con exito');
      },
    });
  }
  cancelEdit(element: HTMLDivElement, property: 'title' | 'description') {
    this.OnEditNews = false;
    this.OnEditNewsTitle = false;
    element.textContent = this.NewsItem[property];
    return;
  }
}
