import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class BuyOrderNotificationService {
  private swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success me-1',
      cancelButton: 'btn btn-danger',
    },
    buttonsStyling: false,
  });

  confirmOperation() {
    return this.swalWithBootstrapButtons.fire({
      text: '¿Esta seguro de eliminar esta orden de compra?',
      showConfirmButton: true,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Si, eliminar`,
      cancelButtonText: 'No, cancelar',
      heightAuto: false,
    });
  }
}
