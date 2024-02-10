import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresupuestoTableListComponent } from './presupuesto-table-list/presupuesto-table-list.component';
import { PaginateNavComponent } from './paginate-nav/paginate-nav.component';

@NgModule({
  declarations: [PresupuestoTableListComponent, PaginateNavComponent],
  imports: [CommonModule],
  exports: [PresupuestoTableListComponent, PaginateNavComponent],
  providers: [],
})
export class SharedComponentsModule {}
