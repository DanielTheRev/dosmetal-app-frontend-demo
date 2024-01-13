import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsManagerPageComponent } from './tools-manager-page.component';

describe('ToolsManagerPageComponent', () => {
  let component: ToolsManagerPageComponent;
  let fixture: ComponentFixture<ToolsManagerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolsManagerPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsManagerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
