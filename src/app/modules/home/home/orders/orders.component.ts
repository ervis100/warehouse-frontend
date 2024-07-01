import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from "../../../../../shared/service/order.service";
import {User} from "../../../../../shared/model/user.model";
import {AuthService} from "../../../../../shared/service/auth.service";
import {Subject, takeUntil} from "rxjs";
import {Order} from "../../../../../shared/model/order.model";
import {OrderStatus} from "../../../../../shared/model/OrderStatus.enum";
import {Router} from "@angular/router";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit, OnDestroy {
  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  public orders: Order[] = [];
  public user: User;
  private unsubAll = new Subject();
  public orderStatus: OrderStatus = null;
  public orderStatuses:string[] = [...Object.values(OrderStatus), "ALL"];

  ngOnInit() {
    this.authService.getUser().pipe(takeUntil(this.unsubAll)).subscribe(user => {
      this.user = user;
      this.fetchOrders();
    })
  }

  fetchOrders() {
    if (this.user.hasRole("ROLE_CLIENT")) {
      this.orderService.getClientOrders(this.orderStatus).pipe(takeUntil(this.unsubAll)).subscribe(response => {
        this.orders = response;
      });
    } else if (this.user.hasRole("ROLE_WAREHOUSE_MANAGER")) {
      this.orderService.getManagerOrders(this.orderStatus).pipe(takeUntil(this.unsubAll)).subscribe(response => {
        this.orders = response;
      });
    }
  }

  onStatusChange(status: OrderStatus) {
    this.orderStatus = status;
    this.fetchOrders();
  }

  navigateToCreateOrder() {
    this.router.navigate(['orders', 'create-order']);
  }

  ngOnDestroy(): void {
    this.unsubAll.unsubscribe();
  }

}
