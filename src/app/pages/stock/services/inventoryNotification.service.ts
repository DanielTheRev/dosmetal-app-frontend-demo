import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

import { IInventoryItem, IRetiro } from '../interfaces/stock.interface';

@Injectable({
  providedIn: 'root',
})
export class InventoryNotificationService {
  swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success me-1',
      cancelButton: 'btn btn-danger',
    },
    buttonsStyling: false,
  });

  ConfirmRemoveInventory(retiro: IRetiro) {
    const itemsElements = retiro.itemsRetirados.map((e) => {
      return `<li> ${e.retiro.cantidadQueRetira} unidades de ${e.nombre}</li>`;
    });

    return this.swalWithBootstrapButtons.fire({
      title: 'CONFIRMAR RETIRO',
      html: `
      <h4>Se retiraran ${retiro.itemsRetirados.length} items<h5/>
      <ul>
        ${itemsElements}
      <ul> 
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Si, retirar`,
      cancelButtonText: 'No, cancelar',
      heightAuto: false,
    });
  }

  confirmAddToInventory(nombre: string, unidades_agregadas: IInventoryItem[]) {

    const unidades_agregadasEl = unidades_agregadas.map((e) => {
      return `
      <li>
        ${e.cantidad_de_contenedor} ${e.tipo_contenedor} de ${e.unidades_en_contenedor} ${e.unidad_medida}      
      </li>`;
    });

    return this.swalWithBootstrapButtons.fire({
      title: 'CONFIRMAR AGREGAR DE STOCK',
      html: `
        <h4 class:"mb-0"> ${nombre} </h4>
        <ul>
          ${unidades_agregadasEl}
        </ul>
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, agregar',
      cancelButtonText: 'No, cancelar',
      heightAuto: false,
    });
  }

  DeleteOrEdit(action: 'borrar' | 'editar') {
    return this.swalWithBootstrapButtons.fire({
      title: `Esta seguro de ${action} este elemento?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: `Si, ${action}.`,
      denyButtonText: 'No, conservarlo',
      heightAuto: false,
    });
  }

  toastNotification(icon: SweetAlertIcon, Message: string) {
    Swal.fire({
      position: 'top-end',
      icon,
      title: Message,
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      toast: true,
    });
    return;
  }
}
