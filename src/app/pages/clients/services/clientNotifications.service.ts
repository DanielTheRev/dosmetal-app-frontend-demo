import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class ClientNotificationService {
  private swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success me-1',
      cancelButton: 'btn btn-danger',
    },
    buttonsStyling: false,
  });

  confirmDeleteClient(){
    const message = 'Esta seguro de borrar este cliente? Todos sus presupuestos tambien seran borrados';

    return this.swalWithBootstrapButtons.fire({
      text: message,
      icon: 'warning',
      confirmButtonText: 'Si, eliminar.'
    })
  }

}