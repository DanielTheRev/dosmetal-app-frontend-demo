import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICliente } from '../../../clients/interfaces/clientes.interface';
import { ClientsStoreService } from '../../../clients/services/clients.store.service';
import { IPresupuesto } from '../../interfaces/presupuesto.interface';
import { PresupuestoStoreService } from '../../services/presupuesto.store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PresupuestosNotificationsService } from '../../services/presupuestosNotifications.service';
import { HeadService } from '../../../../shared/services/Head.service';

@Component({
  selector: 'app-form-presupuesto',
  templateUrl: './form-presupuesto.component.html',
  styleUrls: ['./form-presupuesto.component.scss'],
})
export class FormPresupuestoComponent implements OnInit {
  title: string = 'Nuevo Presupuesto';
  PresupuestoToAdd: IPresupuesto | undefined = undefined;
  form: FormGroup;
  @ViewChildren('item') ItemList!: QueryList<ElementRef<HTMLTableRowElement>>;

  Clientes: ICliente[] = [];
  countData = {
    SubTotal: 0,
    IVA21: 0,
    Total: 0,
  };
  constructor(
    private FormBuilder: FormBuilder,
    private ClientStore: ClientsStoreService,
    private PresupuestoStore: PresupuestoStoreService,
    private PresupuestoNotifications: PresupuestosNotificationsService,
    private Router: Router,
    private ActivatedRoute: ActivatedRoute,
    private HeadService: HeadService
  ) {
    this.HeadService.setTitle('Crear Presupuesto')
    this.form = this.FormBuilder.group({
      Cliente: [
        this.FormBuilder.group({
          _id: [''],
          nombre: [''],
        }),
        Validators.required,
      ],
      TipoPresupuesto: ['Abierto', Validators.required],
      IvaIncluido: ['Incluido'],
      Obra: ['', Validators.required],
      FormaDePago: ['', Validators.required],
      PlazoDeEntrega: ['', Validators.required],
      LugarDeEntrega: ['', Validators.required],
      ValidezDeOferta: ['', Validators.required],
      Nota: [''],
      Items: this.FormBuilder.array([]),
    });
    const PresupuestoID = this.ActivatedRoute.snapshot.params['_id'];

    this.PresupuestoStore.Presupuestos$.subscribe((presupuesto) => {
      const PresupuestoToAdd = presupuesto.find(
        (e) => e._id === PresupuestoID
      )!;
      if (PresupuestoToAdd !== undefined) {

        this.title = 'Continuando presupuesto';
        this.form.setValue({
          Cliente: PresupuestoToAdd.Cliente,
          Obra: PresupuestoToAdd.Obra,
          FormaDePago: PresupuestoToAdd.FormaDePago,
          PlazoDeEntrega: PresupuestoToAdd.PlazoDeEntrega,
          LugarDeEntrega: PresupuestoToAdd.LugarDeEntrega,
          ValidezDeOferta: PresupuestoToAdd.ValidezDeOferta,
          Nota: PresupuestoToAdd.Nota,
          Items: [],
        });
        PresupuestoToAdd.Items.forEach((item) => {
          this.getItems().push(
            this.FormBuilder.group({
              Descripcion: [item.Descripcion, Validators.required],
              Precio: [item.Precio, Validators.required],
            })
          );
        });
        this.CalculatePrice(PresupuestoToAdd.Items);
      }
    });
  }

  ngOnInit(): void {
    this.ClientStore.Clients$.subscribe((res) => {
      this.Clientes = res;
    });
  }

  getItems() {
    return this.form.controls['Items'] as FormArray;
  }

  addItem() {
    if (!this.getItems().valid) return;
    this.getItems().push(
      this.FormBuilder.group({
        Descripcion: ['', Validators.required],
        Precio: ['', Validators.required],
      })
    );
    setTimeout(() => {
      this.ItemList.last.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }, 100);
  }

  deleteItem(idx: number) {
    this.getItems().removeAt(idx, {
      emitEvent: true,
    });

    this.CalculatePrice(this.getItems().value);
  }

  getValue(idx: number) {
    return this.getItems().at(idx);
  }

  setValue(idx: number, value: string, target?: string) {
    try {
      if (target === 'precio') {
        this.getItems()
          .at(idx)
          .setValue({ ...this.getItems().at(idx).value, Precio: value });
        this.CalculatePrice(
          this.getItems().value as { Descripcion: string; Precio: string }[]
        );
        return;
      }
      if (target === 'descripcion') {
        this.getItems()
          .at(idx)
          .setValue({ ...this.getItems().at(idx).value, Descripcion: value });
        return;
      }
      if (target === 'nota') {
        this.form.controls['Nota'].setValue(value);
        return;
      }
    } catch (error) {
      console.log(`hubo un error al actualizar el valor`);
    }
  }

  private CalculatePrice(Items: { Descripcion: string; Precio: string }[]) {
    let count = 0;
    Items.forEach((item) => {
      count += this.transformToValidNumber(item.Precio);
    });
    const iva21 = count * 0.21;
    this.countData.SubTotal = count;
    this.countData.IVA21 = iva21;
    this.countData.Total = count + iva21;
  }

  private transformToValidNumber(numString: string) {
    const num = numString
      .split('')
      .map((e) => {
        if (e === '.') {
          e = '';
        }
        if (e === ',') {
          e = '.';
        }
        return e;
      })
      .filter((f) => f !== '')
      .join('');

    return isNaN(Number(num)) ? 0 : Number(num);
  }

  Continue(target: string) {
    if (target === 'ContinueEditing') {
      this.PresupuestoToAdd = undefined;
      return;
    }

    if (target === 'EndPresupuesto') {
      this.PresupuestoNotifications.ConfirmToProducction().then((res) => {
        // const Estado = res.isConfirmed ? 'Finalizado' : 'En edicion';

        if (res.isConfirmed) {
          const NewPresupuesto: IPresupuesto = {
            ...this.form.value,
            ...this.countData,
            Fecha: Date.now(),
            PresupuestoNum: 1000,
            Estado: 'Finalizado',
          };
          this.PresupuestoStore.addNewPresupuesto(NewPresupuesto).then(
            (res) => {
              this.Router.navigate(['presupuestos']);
            }
          );
          return;
        }
        this.PresupuestoToAdd!.Estado = 'En edicion';
        this.PresupuestoToAdd!._id = this.ActivatedRoute.snapshot.params['_id'];
        console.log(this.PresupuestoToAdd?._id);
        this.PresupuestoStore.ModifyPresupuesto(this.PresupuestoToAdd!);
        this.Router.navigate(['presupuestos']);
      });
    }
  }

  validateStringToNumber(numString: string) {
    const num = numString
      .split('')
      .map((e) => {
        if (e === '.') {
          e = '';
        }
        if (e === ',') {
          e = '.';
        }
        return e;
      })
      .filter((f) => f !== '')
      .join('');

    return isNaN(Number(num));
  }

  Save() {
    if (this.form.valid) {
      const NewPresupuesto: IPresupuesto = {
        ...this.form.value,
        ...this.countData,
        Fecha: Date.now(),
        PresupuestoNum: 0,
        Estado: 'En edicion',
      };
      this.PresupuestoStore.addNewPresupuesto(NewPresupuesto);
      return;
    }
  }
}
