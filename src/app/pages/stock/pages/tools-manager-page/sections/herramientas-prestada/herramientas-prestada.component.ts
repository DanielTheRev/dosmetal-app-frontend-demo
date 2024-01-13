import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-herramientas-prestada',
  templateUrl: './herramientas-prestada.component.html',
  styleUrls: ['./herramientas-prestada.component.scss'],
})
export class HerramientasPrestadaComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  searchTool(keyword: string) {
    console.log(keyword);
  }
}
