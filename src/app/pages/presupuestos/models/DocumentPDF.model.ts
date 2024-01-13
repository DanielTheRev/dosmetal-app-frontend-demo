import { IPresupuesto } from '../interfaces/presupuesto.interface';

interface Item {
  Descripcion: string;
  Precio: string;
}

interface IPage {
  pageNumber: number;
  pageData: Item[];
  isActual: boolean;
  showFooter: boolean;
}

export class PDFModel {
  Paginas: IPage[] = [
    {
      isActual: true,
      pageData: [],
      pageNumber: 1,
      showFooter: true,
    },
  ];
  constructor(Presupuesto: IPresupuesto) {
    this.FillItems(Presupuesto);
  }

  private FillItems(Presupuesto: IPresupuesto) {
    Presupuesto.Items.forEach((item) => {
      let page_idx = this.Paginas.findIndex((e) => e.isActual);
      const page_number = this.Paginas[page_idx].pageNumber;
      const max_box_size = page_number === 1 ? 700 : 900;
      const box_sizing = this.getTableSize(this.Paginas[page_idx].pageData);
      if (max_box_size - box_sizing >= 45) {
        this.Paginas[page_idx].pageData.push(item);
        return;
      }

      this.Paginas[page_idx].isActual = false;
      this.Paginas[page_idx].showFooter = false;

      const new_page: IPage = {
        pageNumber: this.Paginas.length + 1,
        pageData: [item],
        isActual: true,
        showFooter: true,
      };
      this.Paginas.push(new_page);
      return;
    });
  }

  private getTableSize(items: Item[]) {
    let box_size = 0;
    items.forEach((item) => {
      const line_height = 45;
      const cant_lineas = Math.ceil(item.Descripcion.trim().length / 95);
      let box_height = (line_height * cant_lineas) / 2 + 4;
      if (cant_lineas <= 1 || item.Descripcion.trim().length <= 0) {
        box_height = 45;
      }
      box_size += box_height;
    });

    return box_size;
  }
}
