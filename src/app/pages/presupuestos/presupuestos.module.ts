import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PresupuestosRoutingModule } from './presupuestos-routing.module';
import { ListPresupuestosComponent } from './pages/list-presupuestos/list-presupuestos.component';
import { PreviewPresupuestoComponent } from './pages/presupuestos-viewer/components/preview-presupuesto/preview-presupuesto.component';
import { MaterialModule } from '../../shared/material.module';
import { ItemComponent } from './pages/presupuestos-viewer/components/item/item.component';
import { FormatNumPipe } from './pipes/format-num.pipe';
import { FormPresupuestoComponent } from './pages/form-presupuesto/form-presupuesto.component';
import { RowItemComponent } from './pages/form-presupuesto/components/row-item/row-item.component';
import { PresupuestosViewerComponent } from './pages/presupuestos-viewer/presupuestos-viewer.component';
import { EditPresupuestoComponent } from './pages/edit-presupuesto/edit-presupuesto.component';
import { SharedComponentsModule } from 'src/app/shared/components/components.module';

@NgModule({
  declarations: [
    ListPresupuestosComponent,
    PreviewPresupuestoComponent,
    ItemComponent,
    FormatNumPipe,
    FormPresupuestoComponent,
    RowItemComponent,
    PresupuestosViewerComponent,
    EditPresupuestoComponent,
  ],
  imports: [
    CommonModule,
    PresupuestosRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedComponentsModule
  ],
})
export class PresupuestosModule {}
