import {Routes} from '@angular/router';
import {AccessGuard} from "../../../shared/guard/access.guard";
import {HomeComponent} from "./home/home.component";
import {UsersComponent} from "./home/users/users.component";
import {OrdersComponent} from "./home/orders/orders.component";
import {DashboardComponent} from "./home/dashboard/dashboard.component";
import {UpdateUserComponent} from "./home/users/update-user/update-user.component";
import {OrderDetailsComponent} from "./home/orders/order-details/order-details.component";
import {CreateOrderComponent} from "./home/orders/create-order/create-order.component";
import {TrucksComponent} from "./home/trucks/trucks.component";
import {ItemsComponent} from "./home/items/items.component";

export const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'dashboard',
        children: [
          {
            path: '',
            component: DashboardComponent,
            // canActivate: [AccessGuard.role('Admin')],
          },
        ],
      },
      {
        path: 'users',
        canActivate: [AccessGuard.role('ROLE_SYSTEM_ADMIN')],
        children: [
          {
            path: '',
            component: UsersComponent,
          },
          {
            path: ":id",
            component: UpdateUserComponent
          }
        ],
      },
      {
        path: 'deliveries',
        canActivate: [
          AccessGuard.anyRole(['ROLE_WAREHOUSE_MANAGER']),
        ],
        children: [
          // {
          //   path: '',
          //   component: DeliveriesComponent,
          // },
        ],
      },
      {
        path: 'orders',
        canActivate: [
          AccessGuard.anyRole([
            'ROLE_CLIENT',
            'ROLE_WAREHOUSE_MANAGER',
          ]),
        ],
        children: [
          {
            path: '',
            component: OrdersComponent,
            canActivate: [AccessGuard.anyRole(["ROLE_CLIENT", "ROLE_WAREHOUSE_MANAGER"]),],
          },
          {
            path: 'create-order',
            component: CreateOrderComponent,
            canActivate: [AccessGuard.anyRole(["ROLE_CLIENT"])],
          },
          {
            path: ':id',
            component: OrderDetailsComponent,
          },
        ],
      },
      {
        path: 'trucks',
        canActivate: [
          AccessGuard.anyRole(['ROLE_WAREHOUSE_MANAGER']),
        ],
        children: [
          {
            path: '',
            component: TrucksComponent,
          },
        ],
      },
      {
        path: 'items',
        canActivate: [
          AccessGuard.anyRole(['ROLE_WAREHOUSE_MANAGER']),
        ],
        children: [
          {
            path: '',
            component: ItemsComponent,
          },
        ],
      },
    ],
  },
];
