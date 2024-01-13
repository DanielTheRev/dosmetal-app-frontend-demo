import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { AuthStoreService } from '../../login/services/auth.store.service';

interface routelink {
  routerLinkActive: string;
  routerLink: string;
  name: string;
  icon: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('burgerMenu') burgerMenu!: ElementRef<HTMLElement>;
  routes: routelink[] = [
    {
      routerLinkActive: 'active',
      routerLink: 'clients',
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

  centerSelection(id: number) {
    const nav = document.getElementById(`${id}`);
    if (!nav) return;
  }
}
