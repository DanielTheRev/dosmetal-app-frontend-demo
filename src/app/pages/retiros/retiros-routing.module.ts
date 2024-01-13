import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RetirosComponent } from './retiros.component';

const routes: Routes = [
  {
    path: '',
    component: RetirosComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RetirosRoutingModule { }
