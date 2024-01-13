import { Component, OnInit } from '@angular/core';
import { HeadService } from '../../shared/services/Head.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
  constructor(private HeadService: HeadService) {}

  ngOnInit(): void {
    this.HeadService.setTitle('Clientes');
  }
}
