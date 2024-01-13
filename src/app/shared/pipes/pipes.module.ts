import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayJSPipe } from './day-js.pipe';
import { TransformObjArrPipe } from './transform-obj-arr.pipe';



@NgModule({
  declarations: [DayJSPipe, TransformObjArrPipe],
  imports: [
    CommonModule
  ],
  exports: [
    DayJSPipe,
    TransformObjArrPipe
  ]
})
export class PipesModule { }
