import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import * as dayjs from 'dayjs';
import 'dayjs/locale/es';
dayjs.locale('es');
import { RetiroStoreService } from '../../services/retiroStore.service';
@Component({
  selector: 'app-change-date-dialog',
  templateUrl: './change-date-dialog.component.html',
  styleUrls: ['./change-date-dialog.component.scss'],
})
export class ChangeDateDialogComponent implements OnInit {
  months: any[] = [];
  DayMonthIDs: any;
  dayJS = dayjs;
  constructor(
    private MatDialogRef: MatDialogRef<ChangeDateDialogComponent>,
    private RetiroStateService: RetiroStoreService
  ) {}

  ngOnInit(): void {
    this.RetiroStateService.Months$.subscribe((data) => {
      console.log(data);
      this.months = data
        .sort((a, b) => b.timeStamp - a.timeStamp)
        .map((e) => {
          e.days.sort((a: any, b: any) => b.timestamp - a.timestamp);
          return e;
        });
    });
  }

  saveChanges() {
    this.MatDialogRef.close(this.DayMonthIDs);
  }

  formatDate(timestamp: number) {
    return this.dayJS(timestamp).format('MMMM-YYYY');
  }
}
