import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RetirosRoutingModule } from './retiros-routing.module';
import { RetirosComponent } from './retiros.component';
import { ChangeStateDialogComponent } from './components/change-state-dialog/change-state-dialog.component';
import { MaterialModule } from '../../shared/material.module';
import { EventItemComponent } from './components/event-item/event-item.component';
import { ChangeDateDialogComponent } from './components/change-date-dialog/change-date-dialog.component';
import { DaysListComponent } from './components/days-list/days-list.component';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { ChangeDateRetiroComponent } from './components/change-date-retiro/change-date-retiro.component';
import { TransformToCalendarPipe } from './pipes/transform-to-calendar.pipe';
@NgModule({
  declarations: [
    RetirosComponent,
    ChangeStateDialogComponent,
    EventItemComponent,
    ChangeDateDialogComponent,
    DaysListComponent,
    ChangeDateRetiroComponent,
    TransformToCalendarPipe,
  ],
  imports: [
    CommonModule,
    RetirosRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    PipesModule
  ],
})
export class RetirosModule {}
