import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryHistoryDialogComponent } from './inventory-history-dialog.component';

describe('InventoryHistoryDialogComponent', () => {
  let component: InventoryHistoryDialogComponent;
  let fixture: ComponentFixture<InventoryHistoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryHistoryDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryHistoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
