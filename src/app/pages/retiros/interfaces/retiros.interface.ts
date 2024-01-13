
export interface IMonth {
  _id?: string;
  month: string;
  timeStamp: number;
  days: IDay[];
};

export interface IDay {
  _id?: string;
  MonthID: string;
  day: string;
  timestamp: number;
  dayEvents: IEvent[];
};

export interface IEvent {
  _id?: string;
  paraQuienRetira: string;
  nombreQuienRetira: string;
  itemsRetirados: IItemRetirado[];
};

export interface IItemRetirado {
  nombre: string;
  referencia: string;
  retiro: number;
}