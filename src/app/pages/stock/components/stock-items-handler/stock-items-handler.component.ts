import { Component, OnInit, Output,Input, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IInventoryItem } from '../../interfaces/stock.interface';

@Component({
  selector: 'app-stock-items-handler',
  templateUrl: './stock-items-handler.component.html',
  styleUrls: ['./stock-items-handler.component.scss'],
})
export class StockItemsHandlerComponent implements OnInit {
  Items: FormGroup;

  @Output('stock') EmitStock = new EventEmitter<{newStock: IInventoryItem[]}>()
  @Input('loadStock') loadStock: IInventoryItem[] = [];

  constructor(private FormBuilder: FormBuilder) {
    this.Items = this.FormBuilder.group({
      newStock: this.FormBuilder.array(
        [],
        [Validators.minLength(1), Validators.required]
      ),
    });
  }

  ngOnInit(): void {
    this.Items.valueChanges.subscribe({
      next: changes => {
        if(this.Items.valid){
          this.EmitStock.emit(changes);
        }
      }
    })

    this.loadStock.forEach(e => {
      this.getInventario().push(this.FormBuilder.group(e));
    })
  }


  getInvalidField(idx: number) {
    return this.getInventario().at(idx).touched && this.getInventario().at(idx).invalid
  }

  getValidField(idx: number) {
    return this.getInventario().at(idx).touched && this.getInventario().at(idx).valid
  }

  getInventario() {
    return this.Items.controls['newStock'] as FormArray;
  }

  getInventarioValue(idx: number) {
    return this.getInventario().at(idx).value;
  }

  addInventario(tipo: string) {
    this.getInventario().markAllAsTouched();
    if(this.getInventario().length > 0 && this.Items.invalid) return ;

    if (tipo === 'Unidades sueltas') {
      this.getInventario().push(
        this.FormBuilder.group({
          tipo_contenedor: [tipo],
          unidades_en_contenedor: [, Validators.required],
          unidad_medida: ['unidades'],
        })
      );
      return;
    }
    this.getInventario().push(
      this.FormBuilder.group({
        tipo_contenedor: [tipo, Validators.required],
        unidades_en_contenedor: [0, [Validators.required]],
        cantidad_de_contenedor: [0, [Validators.required]],
        unidad_medida: ['', Validators.required],
        esta_abierto: [false],
      })
    );
  }

  deleteInventario(idx: number) {
    this.getInventario().removeAt(idx);
  }
}
