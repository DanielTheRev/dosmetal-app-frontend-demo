import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditPresupuestoComponent } from './pages/edit-presupuesto/edit-presupuesto.component';
import { FormPresupuestoComponent } from './components/form-presupuesto/form-presupuesto.component';
import { ListPresupuestosComponent } from './pages/list-presupuestos/list-presupuestos.component';
import { PresupuestosViewerComponent } from './pages/presupuestos-viewer/presupuestos-viewer.component';

const routes: Routes = [
  {
    path: '',
    component: ListPresupuestosComponent,
  },
  {
    path: 'editar-presupuesto/:_id',
    component: EditPresupuestoComponent,
  },
  {
    path: 'crear-presupuesto/:_id',
    component: FormPresupuestoComponent,
  },
  {
    path: 'ver/:_id',
    component: PresupuestosViewerComponent,
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
export class PresupuestosRoutingModule {}
