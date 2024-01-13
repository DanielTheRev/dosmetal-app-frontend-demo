import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPresupuestosComponent } from './list-presupuestos.component';

describe('ListPresupuestosComponent', () => {
  let component: ListPresupuestosComponent;
  let fixture: ComponentFixture<ListPresupuestosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPresupuestosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPresupuestosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
