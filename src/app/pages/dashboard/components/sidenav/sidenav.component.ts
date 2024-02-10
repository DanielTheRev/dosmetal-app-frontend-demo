import { Component, OnInit } from '@angular/core';
import { AuthStoreService } from '../../../../login/services/auth.store.service';

interface routelink {
  routerLinkActive: string;
  routerLink: string;
  name: string;
  icon: string;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  routes: routelink[] = [
    {
      routerLinkActive: 'active',
      routerLink: 'clientes',
      name: 'Clientes',
      icon: 'fas fa-address-book',
    },
    {
      routerLinkActive: 'active',
      routerLink: 'presupuestos',
      name: 'Presupuestos',
      icon: 'far fa-file-alt',
    },
    {
      routerLinkActive: 'active',
      routerLink: 'retiros',
      name: 'Retiros',
      icon: 'fas fa-tasks',
    },
    {
      routerLinkActive: 'active',
      routerLink: 'stock',
      name: 'Inventario',
      icon: 'fas fa-cubes',
    },
    {
      routerLinkActive: 'active',
      routerLink: 'ordenesCompra',
      name: 'Compras',
      icon: 'fas fa-shopping-bag',
    },
    {
      routerLinkActive: 'active',
      routerLink: 'administrarPagina',
      name: 'Pagina',
      icon: 'fa-brands fa-html5',
    },
  ];
  userName = {
    Name: '',
    Gender: '',
  };
  Date = Date.now();
  constructor(private AuthStore: AuthStoreService) {}

  ngOnInit(): void {
    this.AuthStore.Auth$.subscribe({
      next: (res) => {
        this.userName = {
          Name: res.Name,
          Gender: res.Gender,
        };
      },
    });
  }

  logOut() {
    this.AuthStore.logOut()
  }
}
