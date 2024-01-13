import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PageDashboardRoutingModule } from './page-dashboard-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { MainPageBannerComponent } from './components/main-page-banner/main-page-banner.component';
import { ProjectSectionComponentComponent } from './pages/project-section-component/project-section-component.component';
import { ProjectComponent } from './pages/project/project.component';
import { AddProjectComponent } from './pages/add-project/add-project.component';
import { NewsPanelComponent } from './pages/news-panel/news-panel.component';
import { CreateNewsComponent } from './pages/news-panel/components/create-news/create-news.component';
import { NewsItemComponent } from './pages/news-panel/components/news-item/news-item.component';

@NgModule({
  declarations: [
    LayoutComponent,
    MainPageComponent,
    ClientsComponent,
    ContactComponent,
    ProjectsComponent,
    MainPageBannerComponent,
    ProjectSectionComponentComponent,
    ProjectComponent,
    AddProjectComponent,
    NewsPanelComponent,
    CreateNewsComponent,
    NewsItemComponent,
  ],
  imports: [CommonModule, PageDashboardRoutingModule, ReactiveFormsModule],
})
export class PageDashboardModule {}
