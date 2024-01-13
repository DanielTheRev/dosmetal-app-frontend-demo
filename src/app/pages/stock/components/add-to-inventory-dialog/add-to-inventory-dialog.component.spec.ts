import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToInventoryDialogComponent } from './add-to-inventory-dialog.component';

describe('AddToInventoryDialogComponent', () => {
  let component: AddToInventoryDialogComponent;
  let fixture: ComponentFixture<AddToInventoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddToInventoryDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToInventoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
