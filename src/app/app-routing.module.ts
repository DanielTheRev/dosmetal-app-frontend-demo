import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RedirectLoggedToHomeGuard } from './guards/redirect-logged-to-home.guard';
import { RedirectToLogingGuard } from './guards/redirect-to-loging.guard';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'auth',
    component: LoginComponent,
    canActivate: [RedirectLoggedToHomeGuard],
  },
  {
    path: '',
    component: DashboardComponent,
    canActivate: [RedirectToLogingGuard],
    loadChildren: () => import('./pages/pages.module').then((m) => m.PagesModule),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
