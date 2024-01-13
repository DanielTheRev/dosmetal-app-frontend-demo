import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import * as dayjs from 'dayjs';
import * as localizedFormat from 'dayjs/plugin/localizedFormat';
import { RetirosService } from './retiros.service';
import { WebSocketService } from '../../../shared/services/websocket.service';
import { IDay, IMonth } from '../interfaces/retiros.interface';
dayjs.extend(localizedFormat);

@Injectable({
  providedIn: 'root',
})
export class RetiroStoreService {
  private readonly _RetirosSource = new BehaviorSubject<IDay>({
    day: '',
    dayEvents: [],
    timestamp: 0,
    MonthID: '',
  });
  // private readonly _DaylistSource = new BehaviorSubject<any[]>([]);
  private readonly _MonthSource = new BehaviorSubject<IMonth[]>([]);

  readonly Retiros$ = this._RetirosSource.asObservable();
  // readonly Daylist$ = this._DaylistSource.asObservable();
  readonly Months$ = this._MonthSource.asObservable();

  dayJS = dayjs();
  ActualDay: number = this.dayJS.date();

  constructor(
    private RetirosService: RetirosService,
    private WebSocketService: WebSocketService
  ) {
    //* Trayendo retiros del dia actual
    this.RetirosService.getTodayRetiros().subscribe({
      next: (res) => {
        this._RetirosSource.next(res);
        return;
      },
    });
    // this.WebSocketService.fromEvent<IDay>('[RETIROS] get Today').subscribe(
    //   (res) => {
    //     this._RetirosSource.next(res);
    //   }
    // );

    //* Trayendo los meses de retiros
    this.RetirosService.getMonthsRetiros().subscribe({
      next: (res) => {
        this._MonthSource.next(res);
      },
    });

    //* Cambios en los retiros
    this.WebSocketService.fromEvent<IDay>('[RETIROS] Get Changes').subscribe(
      (res) => {
        console.log('Cambios en los retiros');
        console.log(res);
        this.setRetirosToday(res);
        // this.setRetirosDay()
      }
    );
  }

  setRetirosDay(MonthYear: string, ActualDay: string) {
    return this.RetirosService.getEspecificDay({ MonthYear, ActualDay });
  }

  setRetirosMonth(Month: IMonth) {
    const Months = this.getRetirosMonths().map((e) => {
      if (e._id === Month._id) {
        e = Month;
      }
      return e;
    });
    this._MonthSource.next(Months);
  }

  getRetirosMonths() {
    return this._MonthSource.getValue();
  }

  setRetirosToday(Day: IDay) {
    const ActualDay = this._RetirosSource.getValue();

    if (Day._id === ActualDay._id) {
      ActualDay.dayEvents = Day.dayEvents;
      this._RetirosSource.next(ActualDay);
      return;
    }
  }

  async saveDetails(producto: any, monthYear: string, actualDay: number) {
  }
}
