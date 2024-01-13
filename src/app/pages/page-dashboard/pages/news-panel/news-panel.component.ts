import { Component, OnInit } from '@angular/core';
import { PresentacionService } from '../../services/presentacion.service';
import {
  News,
  PresentacionInfo,
} from '../../interfaces/Presentacion.interface';

@Component({
  selector: 'app-news-panel',
  templateUrl: './news-panel.component.html',
  styleUrls: ['./news-panel.component.scss'],
})
export class NewsPanelComponent implements OnInit {
  PresentacionInfo: PresentacionInfo = {
    description: '',
    images: [],
  };

  NewsList: News[] = [];
  NewsCreated: News = {
    title: '',
    description: '',
    images: [],
  };

  EditPresentacion = false;
  onCreateNew = false;

  constructor(private PresentacionService: PresentacionService) {}

  ngOnInit(): void {
    this.PresentacionService.getInfoPresentacion().subscribe({
      next: (res) => {
        this.PresentacionInfo = res.Presentacion;
        this.NewsList = res.NewsList;
      },
    });
  }

  loadImage(ev: any, imgID: string) {
    const file = ev.target.files[0] as File;
    this.PresentacionService.updateImage(file, {
      _id: this.PresentacionInfo._id!,
      imgID,
    }).subscribe({
      next: (res) => (this.PresentacionInfo = res.banner_updated),
    });
    return;
  }

  cancelEdit(descriptionEl: HTMLDivElement) {
    this.EditPresentacion = false;
    descriptionEl.textContent = this.PresentacionInfo.description;
    return;
  }

  saveDescription(data: { value: string }) {
    this.PresentacionService.updateDescription({
      _id: this.PresentacionInfo._id!,
      description: data.value,
    }).subscribe({
      next: (res) => {
        this.EditPresentacion = false;
        alert(res.message);
      },
      error: (error) => {
        console.log(error.error.message);
      },
    });
    return;
  }

  saveNews() {
    if (
      this.NewsCreated.title.length <= 0 ||
      this.NewsCreated.description.length <= 0
    ) {
      alert('El titulo o descripcion no pueden estar vacions');
      return;
    }
    this.PresentacionService.createNews(this.NewsCreated).subscribe({
      next: (res) => {
        this.NewsList.push(res.NewsSaved);
        this.onCreateNew = false;
      },
      error: (error) => {
        alert(error.error.message);
        this.onCreateNew = false;
      },
    });
  }
}
