import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageBannerComponent } from './main-page-banner.component';

describe('MainPageBannerComponent', () => {
  let component: MainPageBannerComponent;
  let fixture: ComponentFixture<MainPageBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainPageBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
