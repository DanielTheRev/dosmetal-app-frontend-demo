import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBuyOrderComponent } from './create-buy-order.component';

describe('CreateOrderDialogComponent', () => {
  let component: CreateBuyOrderComponent;
  let fixture: ComponentFixture<CreateBuyOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBuyOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBuyOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
