export interface IBuyOrder {
  _id?: string;
  CompanyName: string;
  Date: string;
  OrderNo: number;
  OrderTo: IOrderTo;
  Products: IProductOrder[];
}

export interface IProductOrder {
  Product: string;
  Amount: string;
}

export interface IOrderTo {
  ClientName: string;
  Adress: string;
  Telephone: string;
}
