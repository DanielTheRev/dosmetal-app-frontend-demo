import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RedirectToLogingGuard } from '../guards/redirect-to-loging.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [RedirectToLogingGuard],
    children: [
      {
        path: 'clients',
        canActivate: [RedirectToLogingGuard],
        loadChildren: () =>
          import('./clients/clients.module').then((m) => m.ClientsModule),
      },
      {
        path: 'presupuestos',
        canActivate: [RedirectToLogingGuard],
        loadChildren: () =>
          import('./presupuestos/presupuestos.module').then(
            (m) => m.PresupuestosModule
          ),
      },
      {
        path: 'stock',
        canActivate: [RedirectToLogingGuard],
        loadChildren: () =>
          import('./stock/stock.module').then((m) => m.StockModule),
      },
      {
        path: 'retiros',
        canActivate: [RedirectToLogingGuard],
        loadChildren: () =>
          import('./retiros/retiros.module').then((m) => m.RetirosModule),
      },
      {
        path: 'ordenesCompra',
        canActivate: [RedirectToLogingGuard],
        loadChildren: () =>
          import('./ordenes-compra/ordenes-compra.module').then(
            (m) => m.OrdenesCompraModule
          ),
      },
      {
        path: 'administrarPagina',
        canActivate: [RedirectToLogingGuard],
        loadChildren: () =>
          import('./page-dashboard/page-dashboard.module').then(
            (m) => m.PageDashboardModule
          ),
      },
      {
        path: '**',
        redirectTo: 'clients',
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
export class PagesRoutingModule {}
