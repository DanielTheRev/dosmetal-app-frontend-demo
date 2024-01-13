import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyOrderViewerComponent } from './buy-order-viewer.component';

describe('BuyOrderViewerComponent', () => {
  let component: BuyOrderViewerComponent;
  let fixture: ComponentFixture<BuyOrderViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyOrderViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyOrderViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
