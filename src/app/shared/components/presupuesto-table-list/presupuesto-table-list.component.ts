import { Component, Input, OnInit, OnChanges, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { IPresupuesto } from '../../../pages/presupuestos/interfaces/presupuesto.interface';
import { PresupuestoStoreService } from '../../../pages/presupuestos/services/presupuesto.store.service';

@Component({
  selector: 'app-presupuesto-table-list',
  templateUrl: './presupuesto-table-list.component.html',
  styleUrls: ['./presupuesto-table-list.component.scss'],
})
export class PresupuestoTableListComponent implements OnInit, OnChanges {
  presupuestos: IPresupuesto[] = [];

  @Input('presupuestos') presupuestosRecived: IPresupuesto[] = [];
  @Input('presupuestosID') presupuestosID: string[] = [];
  constructor(
    private PresupuestoStore: PresupuestoStoreService,
    private Router: Router,
    private NgZ: NgZone
  ) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.presupuestosID.length > 0) {
      this.PresupuestoStore.Presupuestos$.subscribe((res) => {
        this.presupuestos = res.filter((e) =>
          this.presupuestosID.includes(e._id!)
        );
        return;
      });
      return;
    }
    this.presupuestos = this.presupuestosRecived;
  }

  goToPresupuesto(_id: string) {
    const doc = document as any;
    doc.startViewTransition(() => {
      this.NgZ.run(() => {
        this.Router.navigate(['presupuestos', 'ver', _id]);
      });
    });
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
    this.Router.navigate(['presupuestos', 'crear-presupuesto', '']);
    return;
  }

  async deletePresupuesto(presupuestoID: string) {
    this.PresupuestoStore.deletePresupuesto(presupuestoID);
    return;
  }
}
