import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HeadService } from '../../../../shared/services/Head.service';
import { IPresupuesto } from '../../interfaces/presupuesto.interface';
import { PresupuestoStoreService } from '../../services/presupuesto.store.service';
import { PresupuestosNotificationsService } from '../../services/presupuestosNotifications.service';

@Component({
  selector: 'app-edit-presupuesto',
  templateUrl: './edit-presupuesto.component.html',
  styleUrls: ['./edit-presupuesto.component.scss'],
})
export class EditPresupuestoComponent implements OnInit {
  Presupuesto: IPresupuesto = {
    Cliente: {
      _id: '',
      nombre: '',
      cuit: '',
      telefono: '',
      email: '',
    },
    TipoPresupuesto: '',
    Obra: '',
    PresupuestoNum: 0,
    fecha_creacion: 0,
    FormaDePago: '',
    PlazoDeEntrega: '',
    LugarDeEntrega: '',
    ValidezDeOferta: '',
    Nota: '',
    Items: [],
    SubTotal: 5,
    IVA21: 5,
    Total: 5,
    Fecha: 0,
    Estado: '',
    IvaIncluido: '',
  };
  form: FormGroup = this.FormBuilder.group({
    Obra: ['', Validators.required],
    LugarDeEntrega: ['', Validators.required],
    FormaDePago: ['', Validators.required],
    PlazoDeEntrega: ['', Validators.required],
    ValidezDeOferta: ['', Validators.required],
    Items: this.FormBuilder.array([]),
    Nota: [''],
    TipoPresupuesto: ['', Validators.required],
    IvaIncluido: ['', Validators.required],
  });

  @ViewChildren('item') ItemList!: QueryList<ElementRef<HTMLTableRowElement>>;
  @ViewChildren('descripcion') Itemdescripcion!: QueryList<
    ElementRef<HTMLDivElement>
  >;
  constructor(
    private PresupuestoStore: PresupuestoStoreService,
    private ActivatedRoute: ActivatedRoute,
    private FormBuilder: FormBuilder,
    private PresupuestoNotification: PresupuestosNotificationsService,
    private Router: Router,
    private HeadService: HeadService
  ) {
    this.HeadService.setTitle('Editar Presupuesto');
  }

  ngOnInit(): void {
    const P_ID = this.ActivatedRoute.snapshot.params['_id'];
    if (P_ID) {
      this.PresupuestoStore.Presupuestos$.subscribe({
        next: (res) => {
          const Presupuesto_Saved = res.find((e) => e._id === P_ID);
          if (Presupuesto_Saved === undefined) return;
          this.Presupuesto = Presupuesto_Saved;
          this.form.reset({
            Obra: Presupuesto_Saved.Obra,
            LugarDeEntrega: Presupuesto_Saved.LugarDeEntrega,
            FormaDePago: Presupuesto_Saved.FormaDePago,
            PlazoDeEntrega: Presupuesto_Saved.PlazoDeEntrega,
            ValidezDeOferta: Presupuesto_Saved.ValidezDeOferta,
            Items: [],
            Nota: Presupuesto_Saved.Nota,
            TipoPresupuesto: Presupuesto_Saved.TipoPresupuesto,
            IvaIncluido: Presupuesto_Saved.IvaIncluido,
          });
          Presupuesto_Saved.Items.forEach((e) => {
            this.addItem(e);
          });
        },
      });
    }
    const BackupPresupuesto = JSON.parse(
      localStorage.getItem('backupPresupuesto')!
    ) as IPresupuesto;
    if (BackupPresupuesto && BackupPresupuesto._id === P_ID) {
      setTimeout(() => {
        this.Presupuesto = BackupPresupuesto;
        this.form.reset({
          Obra: BackupPresupuesto.Obra,
          LugarDeEntrega: BackupPresupuesto.LugarDeEntrega,
          FormaDePago: BackupPresupuesto.FormaDePago,
          PlazoDeEntrega: BackupPresupuesto.PlazoDeEntrega,
          ValidezDeOferta: BackupPresupuesto.ValidezDeOferta,
          Nota: BackupPresupuesto.Nota,
          TipoPresupuesto: BackupPresupuesto.TipoPresupuesto,
          IvaIncluido: BackupPresupuesto.IvaIncluido,
        });

        BackupPresupuesto.Items.forEach((e) => {
          this.addItem(e);
        });
        this.PresupuestoNotification.requestSuccessful(
          'Copia de seguridad restaurada'
        );
      }, 500);
    }
  }

  CambiarTipoPresupuesto(value: string) {
    if (value === 'Cerrado') {
      this.Presupuesto.Total = 0;
      this.Presupuesto.SubTotal = 0;
      this.Presupuesto.IVA21 = 0;
      this.SaveOnLS('Sub TipoPresupuesto');
      return;
    }
    this.CalculatePrice(this.getItems().value);
    this.SaveOnLS('Sub TipoPresupuesto');
    return;
  }

  initValue(idx: number) {
    if (this.Presupuesto.Items[idx] !== undefined) {
      return this.Presupuesto.Items[idx].Descripcion;
    }
    return '';
  }

  setItemDescription(idx: number, value: string) {
    this.getItems().at(idx).get('Descripcion')!.setValue(value);
    this.SaveOnLS('Set descripcion');
  }

  setTitleObra(newTitle: string) {
    this.form.controls['Obra'].setValue(newTitle);
  }

  quitarIva(value: string) {
    if (value === 'Incluido') {
      const iva21 = this.Presupuesto.SubTotal * 0.21;
      this.Presupuesto.Total = this.Presupuesto.SubTotal + iva21;
      this.Presupuesto.IVA21 = iva21;
      this.SaveOnLS('Quitar iva');
      return;
    }
    this.Presupuesto.Total -= this.Presupuesto.IVA21;
    this.Presupuesto.IVA21 = 0;
    this.SaveOnLS('Quitar iva');
    return;
  }

  addItem(Data?: { Descripcion: string; Precio: string }) {
    this.getItems().push(
      this.FormBuilder.group({
        Descripcion: [Data?.Descripcion || '', Validators.required],
        Precio: [Data?.Precio || '', Validators.min(0)],
      })
    );
    setTimeout(() => {
      this.ItemList.last.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }, 100);
    return;
  }

  getItems() {
    return this.form.controls['Items'] as FormArray;
  }

  deleteItem(idx: number) {
    this.getItems().removeAt(idx);
    if (this.form.controls['TipoPresupuesto'].value === 'Abierto') {
      this.CalculatePrice(this.getItems().value);
      if (this.form.controls['IvaIncluido'].value === 'No incluido') {
        this.quitarIva('No Incluido');
      }
    }
    this.SaveOnLS('Delete item');
    return;
  }

  SaveDocument() {
    if (this.form.invalid) {
      console.log(this.form.value);
      return this.PresupuestoNotification.requestError('Formulario invalido');
    }
    const Presupuesto: IPresupuesto = {
      ...this.Presupuesto,
      ...this.form.value,
    };
    this.PresupuestoNotification.ConfirmToProducction().then((res) => {
      if (res.isConfirmed) {
        Presupuesto.Estado = 'Finalizado';
        this.PresupuestoStore.ModifyPresupuesto(Presupuesto).then((r) => {
          localStorage.removeItem('backupPresupuesto');
          this.Router.navigate(['presupuestos', 'ver', Presupuesto._id]);
        });
        return;
      }
      Presupuesto.Estado = 'En edicion';
      this.PresupuestoStore.ModifyPresupuesto(Presupuesto);
      localStorage.removeItem('backupPresupuesto');
      this.Router.navigate(['presupuestos']);
      return;
    });
  }

  InputPrecioChanges(i: number, value: string) {
    if (this.form.controls['TipoPresupuesto'].value === 'Abierto') {
      const num = this.transformToValidNumber(value);
      this.getItems()
        .at(i)
        .get('Precio')
        ?.setValue(num.toLocaleString('es-AR'));
      this.CalculatePrice(this.getItems().value);
      if (this.form.controls['IvaIncluido'].value === 'No incluido') {
        this.quitarIva('No incluido');
      }
      this.SaveOnLS('Test');
      return;
    }
    return;
  }

  setTotalPrice(Precio: any, input: HTMLInputElement) {
    const iva21 = this.transformToValidNumber(Precio) * 0.21;
    this.Presupuesto.SubTotal = this.transformToValidNumber(Precio);
    this.Presupuesto.IVA21 = iva21;
    this.Presupuesto.Total = this.transformToValidNumber(Precio) + iva21;
    input.value = this.transformToValidNumber(input.value).toLocaleString(
      'es-Ar'
    );
    this.SaveOnLS('Setear precio unitario');
  }

  private CalculatePrice(Items: { Descripcion: string; Precio: string }[]) {
    let count = 0;
    Items.forEach((item) => {
      count += this.transformToValidNumber(item.Precio);
    });
    const iva21 = count * 0.21;
    this.Presupuesto.SubTotal = count;
    this.Presupuesto.IVA21 = iva21;
    this.Presupuesto.Total = count + iva21;
    this.SaveOnLS('Calcular precio');
  }

  private transformToValidNumber(numString: string) {
    if (!numString) return 0;
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

  private SaveOnLS(Donde: string) {
    localStorage.setItem(
      'backupPresupuesto',
      JSON.stringify({ ...this.Presupuesto, ...this.form.value })
    );
    return;
  }
}
