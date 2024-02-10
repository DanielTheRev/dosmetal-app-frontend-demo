import { Component, OnInit } from '@angular/core';
import { HeadService } from 'src/app/shared/services/Head.service';
import { ProjectService } from '../../services/projects.service';

interface Panel {
  _id?: string;
  routerLinkActive: string;
  routerLink: string;
  title: string;
  subRouter?: {
    label: string;
    routes: { _id?: string; section: string; route: string }[];
  };
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  panels: Panel[] = [
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
      routerLink: 'contacto',
      routerLinkActive: 'active',
      title: 'Contacto',
    },
  ];
  constructor(
    private headerService: HeadService,
    private ProjectService: ProjectService
  ) {
    this.headerService.setTitle('Administrar Pagina');
  }

  ngOnInit(): void {
    // res.map((e) => {
    //   return {
    //     ...e,
    //     route: e.section.split(' ').join('-'),
    //   };
    // });
    this.ProjectService.getSections().subscribe({
      next: (res) => {
        this.panels.unshift({
          routerLink: 'trabajos',
          routerLinkActive: 'active',
          title: 'Trabajos',
          subRouter: {
            label: 'Trabajos',
            routes: res.map((e) => {
              return {
                ...e,
                route: '/administrarPagina/trabajos/' + e.section.split(' ').join('-'),
              };
            }),
          },
        });
      },
    });
  }
}
