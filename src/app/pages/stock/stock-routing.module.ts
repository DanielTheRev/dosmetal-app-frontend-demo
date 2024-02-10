import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddInventoryDialogComponent } from './components/add-inventory-dialog/add-inventory-dialog.component';
import { InventoryMainPageComponent } from './pages/inventory-main-page/inventory-main-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ReportMainPageComponent } from './pages/report-main-page/report-main-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      {
        path: 'GestionInventario',
        component: InventoryMainPageComponent,
      },
      {
        path: 'CrearInventario',
        component: AddInventoryDialogComponent,
      },
      {
        path: 'CrearInventario/:_id',
        component: AddInventoryDialogComponent,
      },
      {
        path: 'Reporte',
        component: ReportMainPageComponent,
      },
      {
        path: '**',
        redirectTo: 'GestionInventario',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockRoutingModule {}
