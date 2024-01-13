import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetirarDialogComponent } from './retirar-dialog.component';

describe('RetirarDialogComponent', () => {
  let component: RetirarDialogComponent;
  let fixture: ComponentFixture<RetirarDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetirarDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetirarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
