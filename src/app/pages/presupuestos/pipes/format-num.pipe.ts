import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatNum'
})
export class FormatNumPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    return Number(value).toLocaleString();
  }

}
