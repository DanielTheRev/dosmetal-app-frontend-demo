import { Pipe, PipeTransform } from '@angular/core';
import * as dayjs from 'dayjs';
import 'dayjs/locale/es';
import { IDay, IMonth } from '../interfaces/retiros.interface';

@Pipe({
  name: 'transformToCalendar',
})
export class TransformToCalendarPipe implements PipeTransform {
  transform(Month: IMonth) {
    const timestamp = dayjs(Month.timeStamp);
    const NumberOfDays = timestamp.daysInMonth();
    const FirstDay = timestamp.set('date', 1).format('dddd');
    const OffsetDays = this.getOffSets(FirstDay);

    return [...OffsetDays, ...this.getDays(NumberOfDays, Month)];
  }

  private getDays(NumberOfDays: number, Month: IMonth) {
    return [...Array<IDay>(NumberOfDays)].map((day, index) => {
      const actual_day = (index + 1).toString();
      const day_finded = Month.days.find((d) => d.day === actual_day);
      const _day: IDay = {
        _id: day_finded?._id,
        MonthID: Month._id!,
        day: actual_day,
        timestamp: day_finded?.timestamp || 0,
        dayEvents: day_finded?.dayEvents || [],
      };
      return _day;
    });
  }

  private getOffSets(day: string): IDay[] {
    const types: any = {
      lunes: 0,
      martes: 1,
      miércoles: 2,
      jueves: 3,
      viernes: 4,
      sábado: 5,
      domingo: 6,
    };
    const OFFSETS: IDay[] = [...Array<any>(types[day])].map((val) => {
      const day: IDay = {
        day: '',
        dayEvents: [],
        MonthID: '',
        timestamp: 0,
        _id: '',
      };
      return day;
    });
    return OFFSETS;
  }
}
