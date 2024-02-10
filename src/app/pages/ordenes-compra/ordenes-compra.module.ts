import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { OrdenesCompraRoutingModule } from './ordenes-compra-routing.module';
import { OrdenListComponent } from './components/orden-list/orden-list.component';
import { CreateBuyOrderComponent } from './components/create-buy-order/create-buy-order.component';
import { MaterialModule } from '../../shared/material.module';
import { BuyOrderViewerComponent } from './components/buy-order-viewer/buy-order-viewer.component';
import { BuyOrderComponent } from './components/buy-order/buy-order.component';
import { SharedComponentsModule } from 'src/app/shared/components/components.module';

@NgModule({
  declarations: [
    OrdenListComponent,
    CreateBuyOrderComponent,
    BuyOrderViewerComponent,
    BuyOrderComponent,
  ],
  imports: [
    CommonModule,
    OrdenesCompraRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedComponentsModule,
  ],
})
export class OrdenesCompraModule {}
