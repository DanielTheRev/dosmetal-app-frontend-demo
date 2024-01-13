import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryMainPageComponent } from './inventory-main-page.component';

describe('InventoryMainPageComponent', () => {
  let component: InventoryMainPageComponent;
  let fixture: ComponentFixture<InventoryMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryMainPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
