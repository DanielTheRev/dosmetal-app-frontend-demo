import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IInventory } from 'src/app/pages/stock/interfaces/stock.interface';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  @Input('Report') Report: { name: string; data: IInventory[] } | null = null;
  @ViewChild('ReportEl') ReportEl!: ElementRef<HTMLDivElement>
  constructor() {}

  ngOnInit(): void {}
}
