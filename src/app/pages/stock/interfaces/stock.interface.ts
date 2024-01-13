import { CloudinaryImgRef } from '../../../interfaces/cloudinary.interface';

export interface IInventory {
  _id?: string;
  ImgRef: CloudinaryImgRef;
  Inventario: IInventoryItem[];
  Nombre: string;
  Ubicacion: string;
  Cant_poco_stock: number;
  Categoria: { rubro: string; letra: string };
  NumeroAsignado: number;
  Referencia: string;
  TotalInventario: number;
  InventoryState: string;
}

export interface IInventoryItem {
  cantidad_de_contenedor: number;
  tipo_contenedor: string;
  unidad_medida: string;
  unidades_en_contenedor: number;
  esta_abierto: boolean;
}

export interface IcartItem {
  _id: string;
  referencia: string;
  nombre: string;
  imgURL: CloudinaryImgRef;
  retiro: {
    cantidadQueRetira: number;
  };
}

export interface IRetiro {
  paraQuienRetira: string;
  nombreQuienRetira: string;
  itemsToIgnore: IcartItem[];
  itemsRetirados: IItemRetirado[];
}

export interface IItemRetirado {
  _id: string;
  imgURL: CloudinaryImgRef;
  nombre: string;
  referencia: string;
  retiro: {
    cantidadQueRetira: number;
  };
}

export interface ISuccessRetiro {
  itemsToIgnore: IcartItem[];
  status: boolean;
  message: string;
}
