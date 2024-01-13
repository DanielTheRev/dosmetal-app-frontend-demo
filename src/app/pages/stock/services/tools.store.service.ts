import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ITool } from '../pages/tools-manager-page/interfaces/tool.interface';
import { InventoryNotificationService } from './inventoryNotification.service';
import { ToolsService } from './tools.service';

@Injectable({
  providedIn: 'root',
})
export class ToolStoreService {
  private readonly _ToolSource = new BehaviorSubject<{
    data: ITool[];
    isEmpty: boolean;
    isLoading: boolean;
  }>({
    data: [],
    isEmpty: true,
    isLoading: true,
  });

  readonly Tool$ = this._ToolSource.asObservable();

  constructor(
    private ToolService: ToolsService,
    private InventoryNotifications: InventoryNotificationService
  ) {
    this.ToolService.getAllTools().subscribe({
      next: (res) => {
        this._setTool(res);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.error);
      },
    });
  }

  private _setTool(Tools: { data: ITool[]; isEmpty: boolean }) {
    this._ToolSource.next({...Tools, isLoading: false});
  }

  getToolValue() {
    return this._ToolSource.value;
  }

  addNewTool(newTool: { Data: ITool; imgFile: File | undefined }) {
    return new Promise((resolve, reject) => {
      this.ToolService.addNewTool(newTool).subscribe({
        next: (res) => {
          const tools = this.getToolValue();
          tools.data.push(res.data);
          tools.isEmpty = tools.data.length <= 0;
          this._setTool(tools);
          this.InventoryNotifications.toastNotification('success', res.message);
          return resolve(true);
        },
        error: (error: HttpErrorResponse) => {
          this.InventoryNotifications.toastNotification(
            'error',
            error.error.message
          );
          return reject(error.error.message);
        },
      });
    });
  }

  updateTool(tool: { Data: ITool; imgFile: File | undefined }) {
    return new Promise((resolve, reject) => {
      this.ToolService.updateToolData(tool).subscribe({
        next: (res) => {
          let tools = this.getToolValue();
          tools.data = tools.data.map((e) => {
            if (e._id === res.toolUpdated._id) {
              e = res.toolUpdated;
            }
            return e;
          });
          tools.isEmpty = tools.data.length <= 0;
          this._setTool(tools);
          this.InventoryNotifications.toastNotification(
            'success',
            'Herramienta Actualizada'
          );
          return resolve(true);
        },
        error: (err) => {
          this.InventoryNotifications.toastNotification(
            'error',
            'Error al actualizar herramienta'
          );
          return reject(false);
        },
      });
    });
  }

  deleteTool(_id: string) {
    this.ToolService.deleteTool(_id).subscribe({
      next: (res) => {
        const toolList = {
          data: this.getToolValue().data.filter((e) => e._id !== _id),
          isEmpty: this.getToolValue().data.length <= 0,
        };
        this._setTool(toolList);
        this.InventoryNotifications.toastNotification('success', res.message);
      },
      error: (error: HttpErrorResponse) => {
        this.InventoryNotifications.toastNotification(
          'error',
          error.error.message
        );
      },
    });
  }

  getTool(_id: string): Observable<ITool> {
    return new Observable((subscriber) => {
      this.Tool$.subscribe({
        next: (res) => {
          const item = res.data.find((e) => e._id === _id);
          if (item) return subscriber.next(item);
        },
      });
    });
  }
}
