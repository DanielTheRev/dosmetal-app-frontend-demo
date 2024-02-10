import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  actualRoute: string = '';

  constructor(private ActivatedRoute: Router) {
    this.actualRoute = this.ActivatedRoute.url.split('/')[1];
    this.ActivatedRoute.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.actualRoute = event.urlAfterRedirects.split('/')[1];
      });
  }
}
