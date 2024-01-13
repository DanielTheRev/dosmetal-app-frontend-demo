import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project, Section } from '../../interfaces/project.interface';
import { ProjectService } from '../../services/projects.service';

@Component({
  selector: 'app-project-section-component',
  templateUrl: './project-section-component.component.html',
  styleUrls: ['./project-section-component.component.scss'],
})
export class ProjectSectionComponentComponent implements OnInit {
  sectionActivated: Section = {
    _id: '',
    section: '',
    data: [],
  };
  lastProject: Project = {
    _id: '',
    isLastProject: false,
    ProjectTitle: '',
    ProjectDescription: '',
    ProjectImgs: [],
  };

  projectSelected: Project | undefined = undefined;

  showAddView: boolean = false;
  constructor(
    private ActivatedRoute: ActivatedRoute,
    private ProjectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.ActivatedRoute.params.subscribe({
      next: (params) => {
        const section = params['section'].split('-').join(' ');
        this.ProjectService.getSectionData(section).subscribe({
          next: (res) => {
            this.sectionActivated = res;
            this.lastProject = this.sectionActivated.data.find(
              (p) => p.isLastProject
            )!;
          },
        });
      },
    });
  }

  addNewProject(data: { isNew: boolean; data: Project }) {
    if (data.isNew) {
      this.sectionActivated.data.push(data.data);
      this.showAddView = false;
      return;
    }
    console.log(data);

    const projectToUpdate = this.sectionActivated.data.findIndex(
      (e) => e._id === data.data._id
    );
    if (projectToUpdate === -1) {
      return console.log('Se produjo un error al actualizar los datos');
    }
    this.sectionActivated.data[projectToUpdate] = data.data;
    this.showAddView = false;
    return;
  }

  addProjectBTN() {
    this.showAddView = !this.showAddView;
    this.projectSelected = undefined;
  }

  deleteProject(projectID: string) {
    if (
      confirm(
        'Estas seguro de eliminar este proyecto y todos sus datos, incluidos imagenes?'
      )
    ) {
      this.ProjectService.deleteProjectFromSection(
        this.sectionActivated._id,
        projectID
      ).subscribe({
        next: (res) => {
          this.sectionActivated.data = this.sectionActivated.data.filter(
            (e) => e._id !== projectID
          );
        },
      });
    }
  }

  editProject(project: Project) {
    this.projectSelected = project;
    this.showAddView = true;
  }
}
