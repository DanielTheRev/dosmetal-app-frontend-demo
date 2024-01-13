import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './clients.component';
import { ClientPageComponent } from './pages/client-page/client-page.component';
import { ClientsPageComponent } from './pages/clients-page/clients-page.component';

const routes: Routes = [
  {
    path: '',
    component: ClientsComponent,
    children: [
      {
        path: '',
        component: ClientsPageComponent,
      },
      {
        path: 'ver/:_id',
        component: ClientPageComponent,
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'clientes'
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule {}
