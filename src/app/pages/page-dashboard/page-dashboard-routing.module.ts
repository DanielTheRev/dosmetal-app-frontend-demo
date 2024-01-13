import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from '../clients/clients.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ProjectSectionComponentComponent } from './pages/project-section-component/project-section-component.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ProjectComponent } from './pages/project/project.component';
import { ContactComponent } from './pages/contact/contact.component';
import { NewsPanelComponent } from './pages/news-panel/news-panel.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'pagina-principal',
        component: MainPageComponent,
      },
      {
        path: 'panel-noticias',
        component: NewsPanelComponent,
      },
      {
        path: 'trabajos',
        component: ProjectsComponent,
        children: [
          {
            path: ':section',
            component: ProjectSectionComponentComponent,
          },
          {
            path: ':section/:projectID',
            component: ProjectComponent,
          },
          {
            path: '**',
            redirectTo: 'Aberturas-de-PVC',
            pathMatch: 'full',
          },
        ],
      },
      {
        path: 'clientes',
        component: ClientsComponent,
      },
      {
        path: 'contacto',
        component: ContactComponent,
      },
      {
        path: '**',
        redirectTo: 'pagina-principal',
        pathMatch: 'full',
      },
    ],
  },

  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageDashboardRoutingModule {}
