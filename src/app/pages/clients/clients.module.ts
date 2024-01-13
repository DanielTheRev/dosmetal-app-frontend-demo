import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients.component';
import { MaterialModule } from '../../shared/material.module';
import { AddNewClientDialogComponent } from './components/add-new-client-dialog/add-new-client-dialog.component';
import { ClientsTableComponent } from './components/clients-table/clients-table.component';
import { ClientPageComponent } from './pages/client-page/client-page.component';
import { ClientsPageComponent } from './pages/clients-page/clients-page.component';
import { SharedComponentsModule } from 'src/app/shared/components/components.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';

@NgModule({
  declarations: [
    ClientsComponent,
    AddNewClientDialogComponent,
    ClientsTableComponent,
    ClientPageComponent,
    ClientsPageComponent,
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedComponentsModule,
    PipesModule,
  ],
})
export class ClientsModule {}
