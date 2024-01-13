import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockItemsHandlerComponent } from './stock-items-handler.component';

describe('StockItemsHandlerComponent', () => {
  let component: StockItemsHandlerComponent;
  let fixture: ComponentFixture<StockItemsHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockItemsHandlerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockItemsHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
