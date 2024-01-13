import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private Snack: MatSnackBar) {}
  requestSuccessful = (message: string) => {
    // Swal.fire({
    //   title: message,
    //   icon: 'success',
    //   iconColor: '#fff',
    //   background: '#00C851',
    //   customClass: {
    //     title: 'text-white',
    //   },
    //   toast: true,
    //   timer: 3000,
    //   position: 'bottom',
    //   showConfirmButton: false,
    // });
    this.Snack.open(message, 'cerrar', { duration: 3000 });
  };
  requestError = (error: string) => {
    // Swal.fire({
    //   title: error,
    //   background: '#e53935',
    //   customClass: {
    //     title: 'text-light',
    //   },
    //   icon: 'error',
    //   iconColor: '#e0e0e0',
    //   toast: true,
    //   timer: 3000,
    //   position: 'top-right',
    //   showConfirmButton: false,
    // });
    this.Snack.open(error, 'cerrar', { duration: 3000 });
  };
}
