import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IBuyOrder } from '../interface/orden-compra.interface';
import { BuyOrderService } from './buy-orders.service';
import { BuyOrderNotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class BuyOrderStoreService {
  private readonly _BuyOrderSource = new BehaviorSubject<{
    isEmpty: boolean;
    data: IBuyOrder[];
  }>({
    isEmpty: true,
    data: [],
  });

  readonly BuyOrders$ = this._BuyOrderSource.asObservable();

  constructor(
    private BuyOrderService: BuyOrderService,
    private BuyOrderNotification: BuyOrderNotificationService
  ) {
    this.BuyOrderService.getAllOrders().subscribe({
      next: (res) => this.setBuyOrders(res),
    });
  }

  private getBuyOrdersValue() {
    return this._BuyOrderSource.value;
  }

  private setBuyOrders(data: { isEmpty: boolean; data: IBuyOrder[] }) {
    data.data.sort((a, b) => {
      if (a.OrderNo < b.OrderNo) return 1;
      return -1;
    });
    this._BuyOrderSource.next(data);
    return;
  }

  AddBuyOrder(BuyOrder: IBuyOrder) {
    this.BuyOrderService.createOrder(BuyOrder).subscribe({
      next: (value) => {
        const newData = [value.order, ...this.getBuyOrdersValue().data]
        this.setBuyOrders({
          isEmpty: newData.length <= 0,
          data: newData,
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getBuyOrder(ID: string) {
    const buyOrder = this.getBuyOrdersValue().data.find((e) => e._id === ID);

    return buyOrder!;
  }

  deleteBuyOrder(ID: string) {
    this.BuyOrderNotification.confirmOperation().then((result) => {
      if (result.isConfirmed) {
        this.BuyOrderService.deleteBuyOrder(ID).subscribe({
          next: (res) => {
            const newData = this.getBuyOrdersValue().data.filter(
              (e) => e._id !== ID
            );

            const newBuyOrderArr: { isEmpty: boolean; data: IBuyOrder[] } = {
              isEmpty: newData.length <= 0,
              data: newData,
            };
            this.setBuyOrders(newBuyOrderArr);
          },
          error: (error) => console.log(error.error.message),
        });
      }
    });
  }
}
