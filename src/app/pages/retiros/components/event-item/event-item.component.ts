import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IDay, IEvent } from '../../interfaces/retiros.interface';
import { ChangeStateDialogComponent } from '../change-state-dialog/change-state-dialog.component';

@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.scss'],
})
export class EventItemComponent implements OnInit {
  @Input() event!: IEvent;
  @Output() UpdateState = new EventEmitter<any>();
  constructor(private MaterialDialog: MatDialog) {}

  ngOnInit(): void {}

  informState() {
    // const dialogRef = this.MaterialDialog.open(ChangeStateDialogComponent);
    // dialogRef.afterClosed().subscribe(ev => {
    //   if(!ev) return;
    //   this.event.estado = ev;
    //   this.UpdateState.emit(this.event)
    // })
  }
}
