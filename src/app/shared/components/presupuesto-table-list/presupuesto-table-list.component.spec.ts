import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresupuestoCardListComponent } from './presupuesto-table-list.component';

describe('PresupuestoCardListComponent', () => {
  let component: PresupuestoCardListComponent;
  let fixture: ComponentFixture<PresupuestoCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresupuestoCardListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresupuestoCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
