import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeadService } from '../../../../shared/services/Head.service';
import { IPresupuesto } from '../../interfaces/presupuesto.interface';
import { PresupuestoStoreService } from '../../services/presupuesto.store.service';
import { MatDialog } from '@angular/material/dialog';
import { FormPresupuestoComponent } from '../form-presupuesto/form-presupuesto.component';

@Component({
  selector: 'app-list-presupuestos',
  templateUrl: './list-presupuestos.component.html',
  styleUrls: ['./list-presupuestos.component.scss'],
})
export class ListPresupuestosComponent implements OnInit {
  Presupuestos: IPresupuesto[] = [];
  PresupuestosFiltered: IPresupuesto[] = [];

  constructor(
    private presupuestoStore: PresupuestoStoreService,
    private Router: Router,
    private HeadService: HeadService,
    private MatDialog: MatDialog
  ) {
    this.HeadService.setTitle('Presupuestos');
    this.presupuestoStore.Presupuestos$.subscribe((presupuestos) => {
      this.Presupuestos = presupuestos;
      this.PresupuestosFiltered = presupuestos;
    });
  }

  ngOnInit(): void {}

  goToPresupuesto(_id: string) {
    this.Router.navigate(['presupuestos', 'ver', _id]);
  }

  addPresupuesto(PresupuestoID?: string) {
    if (PresupuestoID) {
      this.Router.navigate([
        'presupuestos',
        'editar-presupuesto',
        PresupuestoID,
      ]);
      return;
    }
    this.MatDialog.open(FormPresupuestoComponent);
    return;
  }

  findPresupuesto(term: string) {
    this.PresupuestosFiltered = this.Presupuestos.filter(
      (e) =>
        e.Cliente.nombre.toLowerCase().includes(term) ||
        e.Obra.toLowerCase().includes(term)
    );

    if (term.length <= 0) this.PresupuestosFiltered = this.Presupuestos;
  }
}
