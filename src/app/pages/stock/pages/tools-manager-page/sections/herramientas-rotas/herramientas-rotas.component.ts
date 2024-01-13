import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-herramientas-rotas',
  templateUrl: './herramientas-rotas.component.html',
  styleUrls: ['./herramientas-rotas.component.scss'],
})
export class HerramientasRotasComponent implements OnInit {
  title: string = 'Herramientas dañadas';
  constructor() {}

  ngOnInit(): void {}

  searchTool(keyword: string) {
    console.log(keyword);
  }
}
