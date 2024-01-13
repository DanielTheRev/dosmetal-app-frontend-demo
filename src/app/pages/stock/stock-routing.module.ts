import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddInventoryDialogComponent } from './components/add-inventory-dialog/add-inventory-dialog.component';
import { AddToolComponent } from './components/add-tool/add-tool.component';
import { InventoryMainPageComponent } from './pages/inventory-main-page/inventory-main-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ReportMainPageComponent } from './pages/report-main-page/report-main-page.component';
import { HerramientasPrestadaComponent } from './pages/tools-manager-page/sections/herramientas-prestada/herramientas-prestada.component';
import { HerramientasRotasComponent } from './pages/tools-manager-page/sections/herramientas-rotas/herramientas-rotas.component';
import { HerramientasComponent } from './pages/tools-manager-page/sections/herramientas/herramientas.component';
import { ToolsManagerPageComponent } from './pages/tools-manager-page/tools-manager-page.component';

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
        path: 'Gestionar-Herramientas',
        component: ToolsManagerPageComponent,
        children: [
          {
            path: 'herramientas',
            component: HerramientasComponent,
          },
          {
            path: '**',
            redirectTo: 'herramientas',
            pathMatch: 'full',
          },
        ],
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
