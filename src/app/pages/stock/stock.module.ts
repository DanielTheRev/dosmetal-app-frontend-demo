import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { StockRoutingModule } from './stock-routing.module';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { MaterialModule } from '../../shared/material.module';
import { RetirarDialogComponent } from './components/retirar-dialog/retirar-dialog.component';
import { AddInventoryDialogComponent } from './components/add-inventory-dialog/add-inventory-dialog.component';
import { CartItemsListDialogComponent } from './components/cart-items-list-dialog/cart-items-list-dialog.component';
import { AddToInventoryDialogComponent } from './components/add-to-inventory-dialog/add-to-inventory-dialog.component';
import { InventoryMainPageComponent } from './pages/inventory-main-page/inventory-main-page.component';
import { ReportMainPageComponent } from './pages/report-main-page/report-main-page.component';
import { InventoryItemComponent } from './components/inventory-item/inventory-item.component';
import { InventoryHistoryDialogComponent } from './components/inventory-history-dialog/inventory-history-dialog.component';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { FormItemStockComponent } from './components/form-item-stock/form-item-stock.component';
import { ToolsManagerPageComponent } from './pages/tools-manager-page/tools-manager-page.component';
import { HerramientasPrestadaComponent } from './pages/tools-manager-page/sections/herramientas-prestada/herramientas-prestada.component';
import { HerramientasComponent } from './pages/tools-manager-page/sections/herramientas/herramientas.component';
import { HerramientasRotasComponent } from './pages/tools-manager-page/sections/herramientas-rotas/herramientas-rotas.component';
import { ToolsManagerHeaderComponent } from './components/tools-manager-header/tools-manager-header.component';
import { AddToolComponent } from './components/add-tool/add-tool.component';
import { StockItemsHandlerComponent } from './components/stock-items-handler/stock-items-handler.component';
import { PrintPageComponent } from './pages/report-main-page/pages/print-page/print-page.component';
import { ReportComponent } from './pages/report-main-page/components/report/report.component';

@NgModule({
  declarations: [
    MainPageComponent,
    RetirarDialogComponent,
    AddInventoryDialogComponent,
    CartItemsListDialogComponent,
    AddToInventoryDialogComponent,
    InventoryMainPageComponent,
    ReportMainPageComponent,
    InventoryItemComponent,
    InventoryHistoryDialogComponent,
    FormItemStockComponent,
    ToolsManagerPageComponent,
    HerramientasPrestadaComponent,
    HerramientasComponent,
    HerramientasRotasComponent,
    ToolsManagerHeaderComponent,
    AddToolComponent,
    StockItemsHandlerComponent,
    PrintPageComponent,
    ReportComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    StockRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    PipesModule
  ],
  providers: []
})
export class StockModule {}
