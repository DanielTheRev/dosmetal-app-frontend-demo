import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RetiroStoreService } from '../../services/retiroStore.service';
import * as dayjs from 'dayjs';
import 'dayjs/locale/es';
import { IMonth } from '../../interfaces/retiros.interface';
dayjs.locale('es');

@Component({
  selector: 'app-change-date-retiro',
  templateUrl: './change-date-retiro.component.html',
  styleUrls: ['./change-date-retiro.component.scss'],
})
export class ChangeDateRetiroComponent implements OnInit {
  MonthList: IMonth[] = [];
  @Output('DayToSet') DayToSet = new EventEmitter<{
    dayID: string;
    dayTimestamp: number;
    monthID: string;
  }>();
  constructor(private RetiroStore: RetiroStoreService) {}

  ngOnInit(): void {
    this.RetiroStore.Months$.subscribe((data) => {
      this.MonthList = data
        .sort((a, b) => b.timeStamp - a.timeStamp)
        .map((e) => {
          e.days.sort((a: any, b: any) => a.timestamp - b.timestamp);
          return e;
        });
    });
  }

  FormatDate(timestamp: number) {
    return dayjs(timestamp);
  }

  setDate(day: any) {
    console.log(day);
    const DAY_TO_SET = {
      dayID: day._id,
      dayTimestamp: day.timestamp,
      monthID: day.MonthID,
    };
    this.DayToSet.emit(DAY_TO_SET);
  }
}
