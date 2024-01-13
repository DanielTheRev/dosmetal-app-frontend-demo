import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemsListDialogComponent } from './cart-items-list-dialog.component';

describe('CartItemsListDialogComponent', () => {
  let component: CartItemsListDialogComponent;
  let fixture: ComponentFixture<CartItemsListDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartItemsListDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartItemsListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
