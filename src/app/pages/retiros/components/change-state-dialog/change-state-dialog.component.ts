import { Component,  OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-event-dialog',
  templateUrl: './change-state-dialog.component.html',
  styleUrls: ['./change-state-dialog.component.scss'],
})
export class ChangeStateDialogComponent implements OnInit {
  constructor(private MatDielogRef: MatDialogRef<ChangeStateDialogComponent>) {}

  ngOnInit(): void {}

  save(eventString: string) {
    if(eventString.length === 0) return;
    this.MatDielogRef.close(eventString)
  }
}
