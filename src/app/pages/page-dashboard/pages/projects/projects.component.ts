import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  sections: { _id: string; section: string; route: string }[] = [];
  
  constructor(private ProjectService: ProjectService) {}

  ngOnInit(): void {
    this.ProjectService.getSections().subscribe({
      next: (res) => {
        this.sections = res.map((e) => {
          return {
            ...e,
            route: e.section.split(' ').join('-'),
          };
        });
      },
    });
  }
}
