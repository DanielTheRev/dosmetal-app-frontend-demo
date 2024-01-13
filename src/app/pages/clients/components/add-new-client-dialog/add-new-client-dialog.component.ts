import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICliente } from '../../interfaces/clientes.interface';
import { ClientsStoreService } from '../../services/clients.store.service';

@Component({
  selector: 'app-add-new-client-dialog',
  templateUrl: './add-new-client-dialog.component.html',
  styleUrls: ['./add-new-client-dialog.component.scss'],
})
export class AddNewClientDialogComponent implements OnInit {
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<AddNewClientDialogComponent>,
    private clientStore: ClientsStoreService,
    @Inject(MAT_DIALOG_DATA) public data: ICliente | null
  ) {
    this.form = this.getForm();
  }

  ngOnInit(): void {
    if (this.data) {
      this.form.setValue({
        nombre: this.data.nombre,
        cuit: this.data.cuit,
        telefono: this.data.telefono,
        email: this.data.email,
      });
    }
  }

  getForm(): FormGroup {
    return this.formBuilder.group({
      nombre: ['', Validators.required],
      cuit: [''],
      telefono: [''],
      email: [''],
    });
  }

  save() {
    if (this.form.invalid) return;
    const formValues = this.form.value as {
      nombre: string;
      cuit: string;
      telefono: string;
      email: string;
    };
    const client: ICliente = {
      nombre: formValues.nombre,
      cuit: formValues.cuit || 'No cargado',
      Obras: this.data ? this.data.Obras : [],
      telefono: formValues.telefono || 'No cargado',
      email: formValues.email || 'No cargado',
      presupuestos: this.data ? this.data.presupuestos : [],
    };
    if (this.data) {
      this.clientStore.editClient({ ...this.data, ...client });
      this.matDialogRef.close();
      return;
    }
    this.clientStore.addClient(client);
    this.matDialogRef.close();
  }
}
