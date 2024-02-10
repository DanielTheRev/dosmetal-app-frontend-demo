import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PresupuestosRoutingModule } from './presupuestos-routing.module';
import { ListPresupuestosComponent } from './pages/list-presupuestos/list-presupuestos.component';
import { MaterialModule } from '../../shared/material.module';
import { FormatNumPipe } from './pipes/format-num.pipe';
import { FormPresupuestoComponent } from './components/form-presupuesto/form-presupuesto.component';
import { PresupuestosViewerComponent } from './pages/presupuestos-viewer/presupuestos-viewer.component';
import { EditPresupuestoComponent } from './pages/edit-presupuesto/edit-presupuesto.component';
import { SharedComponentsModule } from 'src/app/shared/components/components.module';
import { PreviewPresupuestoComponent } from './components/preview-presupuesto/preview-presupuesto.component';
import { ItemComponent } from './components/preview-presupuesto/components/item/item.component';

@NgModule({
  declarations: [
    ListPresupuestosComponent,
    PreviewPresupuestoComponent,
    ItemComponent,
    FormatNumPipe,
    FormPresupuestoComponent,
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
