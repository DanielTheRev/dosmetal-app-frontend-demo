import { Component, OnInit } from '@angular/core';
import * as dayjs from 'dayjs';
import * as localizedFormat from 'dayjs/plugin/localizedFormat';
import { HeadService } from '../../shared/services/Head.service';
dayjs.extend(localizedFormat);

import { RetiroStoreService } from './services/retiroStore.service';

@Component({
  selector: 'app-retiros',
  templateUrl: './retiros.component.html',
  styleUrls: ['./retiros.component.scss'],
})
export class RetirosComponent implements OnInit {
  dayJS = dayjs();
  events: any[] = [];
  eventsSelected: any[] = [];
  onChangeDate: boolean = false;

  constructor(
    private RetiroStoreService: RetiroStoreService,
    private HeadService: HeadService
  ) {
    this.RetiroStoreService.Retiros$.subscribe((e) => {
      this.events = e.dayEvents;
      this.eventsSelected = e.dayEvents;
    });
  }

  ngOnInit(): void {
    this.HeadService.setTitle('Retiros');
  }

  async saveState(producto: any) {
    // const monthYear = this.ActualDate.format('M-YYYY');
    // this.RetiroStoreService.saveDetails(producto, monthYear, this.ActualDay);
  }

  changeDate() {
    this.onChangeDate = !this.onChangeDate;
  }

  setDay(res: { dayID: string; dayTimestamp: number; monthID: string }) {
    this.dayJS = dayjs(res.dayTimestamp);
    this.RetiroStoreService.setRetirosDay(res.monthID, res.dayID).subscribe(
      (res) => {
        this.eventsSelected = res;
        this.onChangeDate = false;
      }
    );
  }
}
