import { Component, OnInit } from '@angular/core';
import { ITool } from 'src/app/pages/stock/pages/tools-manager-page/interfaces/tool.interface';
import { ToolStoreService } from '../../../../../stock/services/tools.store.service';
import { Router } from '@angular/router';
import { HeadService } from '../../../../../../shared/services/Head.service';

@Component({
  selector: 'app-herramientas',
  templateUrl: './herramientas.component.html',
  styleUrls: ['./herramientas.component.scss'],
})
export class HerramientasComponent implements OnInit {
  Tools: { data: ITool[]; isEmpty: boolean } = {
    data: [],
    isEmpty: true,
  };
  loading = true;
  constructor(
    private ToolStore: ToolStoreService,
    private Router: Router,
    private HeadService: HeadService
  ) {
    this.HeadService.setTitle('Gestion de herramientas');
    this.ToolStore.Tool$.subscribe({
      next: (res) => {
        console.log(res);
        this.loading = res.isLoading;
        this.Tools = res;
      },
    });
  }

  ngOnInit(): void {}

  search(key: string) {
    console.log(key);
  }

  editTool(_id: string) {
    this.Router.navigate([
      'stock',
      'Gestionar-Herramientas',
      'agregar-herramienta',
      _id,
    ]);
  }

  deleteTool(_id: string) {
    this.ToolStore.deleteTool(_id);
  }
}
