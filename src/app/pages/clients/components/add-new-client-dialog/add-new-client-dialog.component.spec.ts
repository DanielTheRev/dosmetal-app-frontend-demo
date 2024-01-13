import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewClientDialogComponent } from './add-new-client-dialog.component';

describe('AddNewClientDialogComponent', () => {
  let component: AddNewClientDialogComponent;
  let fixture: ComponentFixture<AddNewClientDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewClientDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewClientDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
