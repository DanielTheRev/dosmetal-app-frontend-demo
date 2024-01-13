import { Pipe, PipeTransform } from '@angular/core';
import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/es'

dayjs.extend(relativeTime);


@Pipe({
  name: 'dayJS',
})
export class DayJSPipe implements PipeTransform {
  transform(
    value: number | string,
    args?: any,
  ): string {
    const date = dayjs(value).locale('es').format('dddd-DD');
    return date
    
  }
}
