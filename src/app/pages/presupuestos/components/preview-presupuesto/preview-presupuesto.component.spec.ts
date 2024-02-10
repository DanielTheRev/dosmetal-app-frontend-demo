import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewPresupuestoComponent } from './preview-presupuesto.component';

describe('PresupuestoComponent', () => {
  let component: PreviewPresupuestoComponent;
  let fixture: ComponentFixture<PreviewPresupuestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewPresupuestoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewPresupuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
