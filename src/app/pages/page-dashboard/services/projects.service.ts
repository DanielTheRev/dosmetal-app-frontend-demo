import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Project, Section } from '../interfaces/project.interface';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private URI: string = `${environment.server_uri}/dosmetal-page/projects`;
  constructor(private _http: HttpClient) {}

  getSections() {
    return this._http.get<{ _id: string; section: string }[]>(
      `${this.URI}/getSections`
    );
  }

  getSectionData(section: string) {
    return this._http.post<Section>(`${this.URI}/getSectionData`, { section });
  }

  updateProject(sectionID: string, project: Project, files: File[]) {
    const formData = new FormData();
    for (const image of files) {
      formData.append('imgFile', image);
    }
    formData.append('sectionID', sectionID);
    formData.append('project', JSON.stringify(project));
    return this._http.patch<{
      status: boolean;
      message: string;
      projectSaved: Project;
    }>(`${this.URI}/updateProject`, formData);
  }

  addProject(section: string, project: Project) {
    const formData = new FormData();
    for (const image of project.ProjectImgs) {
      formData.append('imgFile', image);
    }
    formData.append('section', section);
    formData.append('data', JSON.stringify(project));
    return this._http.post(`${this.URI}/addProject`, formData);
  }

  deleteProjectFromSection(sectionID: string, projectID: string) {
    return this._http.delete<{ status: boolean; message: string }>(
      `${this.URI}/deleteProject/${sectionID}/${projectID}`
    );
  }

  deleteImgFromProject(
    sectionID: string,
    projectID: string,
    public_id: string
  ) {
    return this._http.post<{ status: true; message: string }>(
      `${this.URI}/deleteImage`,
      {
        sectionID,
        projectID,
        public_id,
      }
    );
  }
}
