import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsManagerHeaderComponent } from './tools-manager-header.component';

describe('ToolsManagerHeaderComponent', () => {
  let component: ToolsManagerHeaderComponent;
  let fixture: ComponentFixture<ToolsManagerHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolsManagerHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsManagerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
