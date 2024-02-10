import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit, AfterViewInit {
  //* HTML Elements
  @ViewChild('itemDescripcion') ItemDescripcion!: ElementRef<HTMLDivElement>;
  @ViewChild('itemPrecio') ItemPrecio!: ElementRef<HTMLDivElement>;

  @Input() Item!: {
    page: number;
    data: any;
    itemNro: number;
    TipoPresupuesto: string;
  };

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
  }
}
