import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresupuestosViewerComponent } from './presupuestos-viewer.component';

describe('PresupuestosViewerComponent', () => {
  let component: PresupuestosViewerComponent;
  let fixture: ComponentFixture<PresupuestosViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresupuestosViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresupuestosViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
