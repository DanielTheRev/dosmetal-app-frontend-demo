import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyOrderViewerComponent } from './components/buy-order-viewer/buy-order-viewer.component';
import { CreateBuyOrderComponent } from './components/create-buy-order/create-buy-order.component';
import { OrdenListComponent } from './components/orden-list/orden-list.component';

const routes: Routes = [
  {
    path: '',
    component: OrdenListComponent,
  },
  {
    path: 'crear-order-pago',
    component: CreateBuyOrderComponent,
  },
  {
    path: 'orden/:id',
    component: BuyOrderViewerComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdenesCompraRoutingModule {}
