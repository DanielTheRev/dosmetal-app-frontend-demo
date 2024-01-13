import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeDateRetiroComponent } from './change-date-retiro.component';

describe('ChangeDateRetiroComponent', () => {
  let component: ChangeDateRetiroComponent;
  let fixture: ComponentFixture<ChangeDateRetiroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeDateRetiroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeDateRetiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
