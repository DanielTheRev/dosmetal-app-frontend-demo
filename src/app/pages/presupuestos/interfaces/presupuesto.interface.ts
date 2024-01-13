export interface IPresupuesto {
  _id?: string;
  Cliente: {
    _id?: string;
    nombre: string;
    cuit: string;
    telefono: string;
    email: string;
  };
  TipoPresupuesto: 'Cerrado' | 'Abierto' | '';
  IvaIncluido: string;
  Obra: string;
  PresupuestoNum: number;
  fecha_creacion: number;
  FormaDePago: string;
  PlazoDeEntrega: string;
  LugarDeEntrega: string;
  ValidezDeOferta: string;
  Nota: string;
  Items: IItemPresupuesto[];
  SubTotal: number;
  IVA21: number;
  Total: number;
  Fecha: number;
  Estado: string;
}

export interface IItemPresupuesto {
  Descripcion: string;
  Precio: string;
  id?: string;
}
