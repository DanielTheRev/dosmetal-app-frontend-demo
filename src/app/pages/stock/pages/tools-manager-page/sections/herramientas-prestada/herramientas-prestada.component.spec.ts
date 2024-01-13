import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HerramientasPrestadaComponent } from './herramientas-prestada.component';

describe('HerramientasPrestadaComponent', () => {
  let component: HerramientasPrestadaComponent;
  let fixture: ComponentFixture<HerramientasPrestadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HerramientasPrestadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HerramientasPrestadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
