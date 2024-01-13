import { Location } from '@angular/common';
import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBuyOrder } from '../../interface/orden-compra.interface';
import { BuyOrderStoreService } from '../../services/buy-order.store';

@Component({
  selector: 'app-create-buy-order',
  templateUrl: './create-buy-order.component.html',
  styleUrls: ['./create-buy-order.component.scss'],
})
export class CreateBuyOrderComponent implements OnInit {
  formData: FormGroup;
  @ViewChildren('tableEL') tableEl!: QueryList<ElementRef<HTMLDivElement>>;

  constructor(
    private formBuilder: FormBuilder,
    private BuyOrderStore: BuyOrderStoreService,
    private Location: Location
  ) {
    this.formData = this.createForm();
  }

  ngOnInit(): void {}

  createForm() {
    return this.formBuilder.group({
      CompanyName: ['', Validators.required],
      OrderTo: this.formBuilder.group({
        ClientName: ['', Validators.required],
        Adress: ['-'],
        Telephone: ['-'],
      }),
      Products: this.formBuilder.array([]),
    });
  }

  getProductos() {
    return this.formData.get('Products') as FormArray;
  }

  addProducto() {
    this.getProductos().push(
      this.formBuilder.group({
        Product: ['', Validators.required],
        Amount: [0, Validators.required],
      })
    );
    setTimeout(() => {
      this.tableEl.last.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  }

  deleteProducto(idx: number) {
    this.getProductos().removeAt(idx);
  }

  goToPreviusPage() {
    this.Location.back();
    return;
  }

  saveData() {
    if (this.formData.invalid) return console.log('Formulario no valido');

    const nuevaOrden: IBuyOrder = {
      ...this.formData.value,
      Date: Date.now(),
      OrderNo: 0,
    };
    this.BuyOrderStore.AddBuyOrder(nuevaOrden);
    this.Location.back();
  }
}
