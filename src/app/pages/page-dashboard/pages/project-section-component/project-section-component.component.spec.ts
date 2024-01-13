import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSectionComponentComponent } from './project-section-component.component';

describe('ProjectSectionComponentComponent', () => {
  let component: ProjectSectionComponentComponent;
  let fixture: ComponentFixture<ProjectSectionComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectSectionComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSectionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
