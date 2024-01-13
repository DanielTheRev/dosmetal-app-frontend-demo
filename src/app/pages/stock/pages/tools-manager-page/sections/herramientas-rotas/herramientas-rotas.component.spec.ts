import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HerramientasRotasComponent } from './herramientas-rotas.component';

describe('HerramientasRotasComponent', () => {
  let component: HerramientasRotasComponent;
  let fixture: ComponentFixture<HerramientasRotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HerramientasRotasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HerramientasRotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
