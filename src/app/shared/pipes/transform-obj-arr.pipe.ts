import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformObjArr',
})
export class TransformObjArrPipe implements PipeTransform {
  transform(value: Object, ...args: any[]): [string, any][] {
    return Object.entries(value).filter(([key, value]) => !args.includes(key));
  }
}
