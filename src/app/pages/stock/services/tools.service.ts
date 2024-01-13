import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITool } from 'src/app/pages/stock/pages/tools-manager-page/interfaces/tool.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ToolsService {
  URI: string = `${environment.server_uri}/tools`;
  constructor(private _HTTP: HttpClient) {}

  getAllTools() {
    return this._HTTP.get<{ data: ITool[]; isEmpty: boolean }>(
      `${this.URI}/get-tools`
    );
  }

  addNewTool(newTool: { Data: ITool; imgFile: File | undefined }) {
    const data = new FormData();
    data.append('newTool', JSON.stringify(newTool.Data));
    data.append('imgFile', newTool.imgFile!);
    return this._HTTP.post<{ message: string; data: ITool }>(
      `${this.URI}/add-new-tool`,
      data
    );
  }

  updateToolData(tool: { Data: ITool; imgFile: File | undefined }) {
    const data = new FormData();
    data.append('data', JSON.stringify(tool.Data));
    data.append('imgFile', tool.imgFile!);
    return this._HTTP.post<{ toolUpdated: ITool }>(
      `${this.URI}/update-tool`,
      data
    );
  }

  deleteTool(_id: string) {
    return this._HTTP.delete<{ message: string }>(
      `${this.URI}/delete-tool/${_id}`
    );
  }
}
