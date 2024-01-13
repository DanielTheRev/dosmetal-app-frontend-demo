import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IInventory, IInventoryItem } from 'src/app/pages/stock/interfaces/stock.interface';

@Component({
  selector: 'app-retirar-dialog',
  templateUrl: './retirar-dialog.component.html',
  styleUrls: ['./retirar-dialog.component.scss'],
})
export class RetirarDialogComponent implements OnInit {
  AvailableStock = +this.data.TotalInventario;
  formData: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IInventory,
    private MatDialogRef: MatDialogRef<RetirarDialogComponent>,
    private FormBuilder: FormBuilder
  ) {
    this.AvailableStock += data.TotalInventario;
    this.formData = this.FormBuilder.group({
      cantidadQueRetira: [
        0,
        [
          Validators.required,
          Validators.max(this.data.TotalInventario),
          Validators.min(1),
        ],
      ],
    });
  }

  ngOnInit(): void {}

  getControl(control: string) {
    return this.formData.controls[control];
  }

  private DiscountStock(
    CantidadRequerida: number,
    stockData: IInventoryItem[]
  ) {
    let stock = [...stockData];

    stock = stock.reduceRight((acc, item) => {
      //Empezando a descontar stock
      if (CantidadRequerida > 0) {
        if (item.tipo_contenedor === 'Unidades sueltas') {
          if (item.unidades_en_contenedor === CantidadRequerida) {
            CantidadRequerida = 0;
            return acc;
          }

          if (item.unidades_en_contenedor > CantidadRequerida) {
            item.unidades_en_contenedor -= CantidadRequerida;
            CantidadRequerida = 0;
            acc.push(item);
            return acc;
          }

          if (item.unidades_en_contenedor < CantidadRequerida) {
            CantidadRequerida -= item.unidades_en_contenedor;
            return acc;
          }
        }
        if (item.cantidad_de_contenedor === 1) {
          // console.log('Tiene solo un item');
          if (item.unidades_en_contenedor > CantidadRequerida) {
            if (item.esta_abierto) {
              item.unidades_en_contenedor -= CantidadRequerida;
              CantidadRequerida = 0;
              acc.push(item);
              return acc;
            }

            item.unidades_en_contenedor -= CantidadRequerida;
            item.esta_abierto = true;
            CantidadRequerida = 0;
            acc.push(item);
            return acc;
          }

          if (item.unidades_en_contenedor < CantidadRequerida) {
            CantidadRequerida -= item.unidades_en_contenedor;
            return acc;
          }

          if (item.unidades_en_contenedor === CantidadRequerida) {
            CantidadRequerida = 0;
            return acc;
          }
        }
        // console.log('Tiene mas de 1 stock');
        while (item.cantidad_de_contenedor > 1 || CantidadRequerida > 0) {
          if (item.unidades_en_contenedor > CantidadRequerida) {
            // console.log('Es mayor a lo requerido');
            if (item.esta_abierto) {
              item.unidades_en_contenedor -= CantidadRequerida;
              CantidadRequerida = 0;
              acc.push(item);
              return acc;
            }
            item.cantidad_de_contenedor -= 1;
            acc.push(item);
            const newBox: IInventoryItem = {
              ...item,
              cantidad_de_contenedor: 1,
            };
            newBox.unidades_en_contenedor -= CantidadRequerida;
            CantidadRequerida = 0;
            newBox.esta_abierto = true;
            acc.push(newBox);
            return acc;
          }
          if (item.unidades_en_contenedor < CantidadRequerida) {
            // console.log('Es menor a lo requerido');
            item.cantidad_de_contenedor -= 1;
            CantidadRequerida -= item.unidades_en_contenedor;
            item.esta_abierto = true;
            item.unidades_en_contenedor -= CantidadRequerida;
            if (item.unidades_en_contenedor > 0) {
              acc.push(item);
            }
            return acc;
          }
          if (item.unidades_en_contenedor === CantidadRequerida) {
            // console.log('Es igual a lo requerido');
            item.cantidad_de_contenedor -= 1;
            CantidadRequerida = 0;
            acc.push(item);
            return acc;
          }
        }
      }
      if (item.unidades_en_contenedor > 0) {
        acc.unshift(item);
      }
      return acc;
    }, [] as IInventoryItem[]);

    return stock;
  }

  save() {
    if (this.formData.invalid) return;

    let CantidadRequerida: number = this.formData.value.cantidadQueRetira;
    //* Descontamos el stock una vez que sea valida la cantidad
    this.data.Inventario = this.DiscountStock(
      CantidadRequerida,
      this.data.Inventario
    );
    //* calculando total de inventario

    let stockTotal = 0;
    this.data.Inventario.forEach((inventory) => {
      if (inventory.tipo_contenedor === 'Unidades sueltas') {
        stockTotal += inventory.unidades_en_contenedor;
        return;
      }
      const cuenta =
        inventory.unidades_en_contenedor * inventory.cantidad_de_contenedor;
      stockTotal += cuenta;
    });
    this.data.TotalInventario = stockTotal;

    switch (true) {
      case stockTotal < this.data.Cant_poco_stock && stockTotal > 0:
        this.data.InventoryState = 'Poco Stock';
        break;
      case stockTotal === 0:
        this.data.InventoryState = 'Sin Stock';
        this.data.TotalInventario = 0;
        break;
      default:
        this.data.InventoryState = 'Stock Suficiente';
        break;
    }
    this.MatDialogRef.close(this.formData.value);
  }
}
