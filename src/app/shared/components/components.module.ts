import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresupuestoTableListComponent } from './presupuesto-table-list/presupuesto-table-list.component';

@NgModule({
  declarations: [PresupuestoTableListComponent],
  imports: [CommonModule],
  exports: [PresupuestoTableListComponent],
  providers: [],
})
export class SharedComponentsModule {}
