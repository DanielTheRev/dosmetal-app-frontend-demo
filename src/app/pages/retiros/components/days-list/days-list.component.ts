import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { RetiroStoreService } from '../../services/retiroStore.service';

@Component({
  selector: 'app-days-list',
  templateUrl: './days-list.component.html',
  styleUrls: ['./days-list.component.scss'],
})
export class DaysListComponent implements OnInit, AfterViewInit {
  @Input() MonthID: string = '';
  @Input() Days: any[] = []
  @Output() DayMonthIDs = new EventEmitter<any>();
  @ViewChildren('dayLi') dayLi!: QueryList<ElementRef<HTMLLIElement>>;

  constructor(private retirosStoreServie: RetiroStoreService) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dayLi.forEach((tab) => {
      tab.nativeElement.addEventListener('click', (el: any) => {
        this.dayLi.forEach((e) => e.nativeElement.classList.remove('active'));
        el.target.classList.add('active');
      });
    });
  }

  setDay(day: any) {
    this.DayMonthIDs.emit({
      dayID: day._id,
      dayTimestamp: day.timestamp,
      monthID: this.MonthID,
    });

  }
}
