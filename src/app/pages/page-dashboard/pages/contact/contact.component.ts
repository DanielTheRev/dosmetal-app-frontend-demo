import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/shared/services/websocket.service';
import { ContactPrespuesto } from '../../interfaces/contactPrespuesto.interface';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  contactPresupuestos: ContactPrespuesto[] = [];

  constructor(
    private ContactService: ContactService,
    private WebSocketService: WebSocketService
  ) {}

  ngOnInit(): void {
    this.ContactService.getContactPresupuesto().subscribe({
      next: (res) => {
        this.contactPresupuestos = res;
      },
    });
    this.WebSocketService.fromEvent<ContactPrespuesto>(
      'new clientPresupuesto'
    ).subscribe({
      next: (res) => {
        this.contactPresupuestos.push(res);
      },
    });
  }
}
