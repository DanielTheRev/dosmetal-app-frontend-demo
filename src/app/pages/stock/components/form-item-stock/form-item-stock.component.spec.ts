import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormItemStockComponent } from './form-item-stock.component';

describe('FormItemStockComponent', () => {
  let component: FormItemStockComponent;
  let fixture: ComponentFixture<FormItemStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormItemStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormItemStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
