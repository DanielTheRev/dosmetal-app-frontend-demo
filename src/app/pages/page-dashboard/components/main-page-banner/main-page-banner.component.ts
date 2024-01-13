import { Component, OnInit, Input } from '@angular/core';
import { HomeBanner } from '../../interfaces/home-banner.interface';
import { HomeBannerService } from '../../services/home-banner.service';

@Component({
  selector: 'app-main-page-banner',
  templateUrl: './main-page-banner.component.html',
  styleUrls: ['./main-page-banner.component.scss'],
})
export class MainPageBannerComponent implements OnInit {
  @Input('homeBanner') HomeBanner: HomeBanner | undefined = undefined;
  onEdit: boolean = false;
  files: File[] = [];
  fileSubmitting: boolean = false;
  descriptionSubmitting: boolean = false;
  constructor(private HomeBannerService: HomeBannerService) {}

  ngOnInit(): void {}

  setEditMode() {
    this.onEdit = true;
  }

  loadImage(ev: any, id: string) {
    const file = ev.target.files[0] as File;
    this.saveImage(file, id);
  }

  saveDescription(description: string) {
    if (!this.HomeBanner) return;
    this.descriptionSubmitting = true;
    this.HomeBannerService.editHomeBannerDescription({
      _id: this.HomeBanner!._id!,
      description,
    }).subscribe({
      next: (res) => {
        this.HomeBanner = res.bannerSaved;
        this.onEdit = false;
        this.descriptionSubmitting = false;
      },
    });
  }

  private saveImage(file: File, imgID: string) {
    if (!file) return alert('No hay imagen');

    this.fileSubmitting = true;
    this.HomeBannerService.editHomeBannerImage(
      file,
      this.HomeBanner!._id!,
      this.HomeBanner!.banner,
      imgID
    ).subscribe({
      next: (res) => {
        console.log(res);
        this.HomeBanner = res.bannerSaved;
        this.files = [];
        this.fileSubmitting = false;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
