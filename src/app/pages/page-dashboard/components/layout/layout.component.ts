import { Component, OnInit } from '@angular/core';
import { HeadService } from 'src/app/shared/services/Head.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  panels: { routerLinkActive: string; routerLink: string; title: string }[] =
    [];
  constructor(private headerService: HeadService) {
    this.headerService.setTitle('Administrar Pagina')
  }

  ngOnInit(): void {
    this.panels = [
      {
        routerLink: 'panel-noticias',
        routerLinkActive: 'active',
        title: 'Panel Noticias y Presentacion',
      },
      {
        routerLink: 'pagina-principal',
        routerLinkActive: 'active',
        title: 'Pagina principal',
      },
      {
        routerLink: 'trabajos',
        routerLinkActive: 'active',
        title: 'Trabajos',
      },
      {
        routerLink: 'contacto',
        routerLinkActive: 'active',
        title: 'Contacto',
      },
    ];
  }
}
