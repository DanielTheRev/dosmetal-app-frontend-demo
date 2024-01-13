import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class PresupuestosNotificationsService {
  private swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success me-1',
      cancelButton: 'btn btn-danger',
    },
    buttonsStyling: false,
  });

  ConfirmToProducction() {
    const message = '¿Quiere dar este presupuesto como terminado?';
    return this.swalWithBootstrapButtons.fire({
      text: message,
      icon: 'question',
      allowOutsideClick: false,
      confirmButtonText: 'Si',
      cancelButtonText: 'No, seguir editando mas tarde',
      showCancelButton: true,
      heightAuto: false,
    });
  }

  confirmDeletePresupuesto() {
    return this.swalWithBootstrapButtons.fire({
      text: 'Desea eliminar este presupuesto?, una vez borrado ya no podra recuperarse',
      icon: 'warning',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Conservar',
      heightAuto: false
    });
  }

  requestSuccessful(message: string) {
    Swal.fire({
      title: message,
      icon: 'success',
      iconColor: '#fff',
      background: '#00C851',
      customClass: {
        title: 'text-white',
      },
      toast: true,
      timer: 3000,
      position: 'top-right',
      showConfirmButton: false,
    });
  }

  requestError(error: string) {
    Swal.fire({
      title: error,
      background: '#e53935',
      customClass: {
        title: 'text-light',
      },
      icon: 'error',
      iconColor: '#e0e0e0',
      toast: true,
      timer: 3000,
      position: 'top-right',
      showConfirmButton: false,
    });
  }
}
