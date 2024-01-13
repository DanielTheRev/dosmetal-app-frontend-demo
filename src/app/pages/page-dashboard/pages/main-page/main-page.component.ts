import { Component, OnInit } from '@angular/core';
import { HomeBanner } from '../../interfaces/home-banner.interface';
import { HomeBannerService } from '../../services/home-banner.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  homeBanners: HomeBanner[] = [];

  constructor(private HomeBannerService: HomeBannerService) {}

  ngOnInit(): void {
    this.HomeBannerService.getHomeBanners().subscribe({
      next: (res) => {
        this.homeBanners = res;
      },
    });
  }
}
