import {OrderStatus} from "./OrderStatus.enum";

export class Order {
  id: number;
  status: OrderStatus;
  items: OrderItem[];
  submittedDate: Date;
  deadLine: Date;
}

export class OrderItem {
  public itemId: number;
  public itemName: string;
  public quantity: number;
}
