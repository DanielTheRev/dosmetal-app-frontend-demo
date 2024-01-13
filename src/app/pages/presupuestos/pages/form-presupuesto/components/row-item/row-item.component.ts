import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-row-item',
  templateUrl: './row-item.component.html',
  styleUrls: ['./row-item.component.scss']
})
export class RowItemComponent implements OnInit {
  @Input() data!:{idx: number , control: AbstractControl};
  @Output() value = new EventEmitter<{idx: number, value: string, target?: string}>();
  @Output() delete = new EventEmitter<{id: number}>();
  constructor() { }

  ngOnInit(): void {
  }

}
