import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project, Section } from '../../interfaces/project.interface';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ProjectService } from '../../services/projects.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss'],
})
export class AddProjectComponent implements OnInit {
  @Input('section') section: Section | undefined = undefined;
  @Input('project') project: Project | undefined = undefined;
  form: FormGroup;
  files: File[] = [];
  localImages: { src: SafeUrl; id: string }[] = [];
  @Output('newProject') newProject = new EventEmitter<{
    isNew: boolean;
    data: Project;
  }>();
  projectSubmitting: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private ProjectService: ProjectService
  ) {
    this.form = this.formBuilder.group({
      ProjectTitle: ['', Validators.required],
      ProjectDescription: ['', Validators.required],
      isLastProject: [false, Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.project) {
      this.form.reset({
        ProjectTitle: this.project.ProjectTitle,
        ProjectDescription: this.project.ProjectDescription,
        isLastProject: this.project.isLastProject,
      });

      this.localImages = this.project.ProjectImgs.map((e) => {
        return { src: e.secure_url, id: e.public_id };
      });
    }
  }

  loadImages(event: any) {
    for (const f of event.target.files) {
      this.files.unshift(f);
      const blobURL = window.URL.createObjectURL(f);
      console.log(this.files);
      this.localImages.unshift({
        src: this.sanitizer.bypassSecurityTrustUrl(blobURL),
        id: f.name,
      });
    }
    console.log(this.localImages);
    event.target.files = null;
  }

  deleteImg(img: { src: SafeUrl; id: string }) {
    //* Verificar que esta entre los archivos
    const imgToDelete = this.files.find((e) => e.name === img.id);
    if (imgToDelete) {
      //* si existe, entoncs quitarlo de los archivos
      this.files = this.files.filter((f) => f.name !== img.id);
      this.localImages = this.localImages.filter((f) => f.id !== img.id);
      return;
    }

    //* Si no, es que esta en el servidor, quitartla
    const imgcl = this.project?.ProjectImgs.find((e) => e.public_id === img.id);
    this.ProjectService.deleteImgFromProject(
      this.section!._id!,
      this.project!._id!,
      imgcl!.public_id
    ).subscribe({
      next: (res) => {
        this.project!.ProjectImgs = this.project!.ProjectImgs.filter(
          (e) => e.public_id !== imgcl!.public_id
        );
        this.localImages = this.localImages.filter(
          (e) => e.id !== imgcl!.public_id
        );
      },
    });
  }

  saveProject() {
    if (this.form.invalid) return;
    if (this.project) {
      const projectUpdated = {...this.project,...this.form.value};
      
      this.ProjectService.updateProject(
        this.section!._id,
        projectUpdated,
        this.files
      ).subscribe({
        next: (res) => {
          this.projectSubmitting = false;
          this.newProject.emit({ isNew: false, data: res.projectSaved });
        },
      });
      return;
    }

    const project: Project = {
      ...this.form.value,
      ProjectImgs: this.files,
    };
    this.projectSubmitting = true;
    this.ProjectService.addProject(this.section!.section, project).subscribe({
      next: (res: any) => {
        this.projectSubmitting = false;
        this.newProject.emit({ isNew: true, data: res.projectSaved });
      },
    });
  }
}
