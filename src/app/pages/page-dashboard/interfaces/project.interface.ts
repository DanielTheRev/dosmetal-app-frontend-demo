export interface Section {
  _id: string;
  section: string;
  data: Project[];
}

export interface Project {
  _id?: string;
  isLastProject: boolean;
  ProjectTitle: string;
  ProjectDescription: string;
  ProjectImgs: any[];
}
