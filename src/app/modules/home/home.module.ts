import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {homeRoutes} from "./home.routes";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HomeComponent} from './home/home.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatListModule} from "@angular/material/list";
import {MatNativeDateModule, MatRippleModule} from "@angular/material/core";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSelectModule} from "@angular/material/select";
import {MatSortModule} from "@angular/material/sort";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatTabsModule} from "@angular/material/tabs";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatDialogModule} from "@angular/material/dialog";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatRadioModule} from "@angular/material/radio";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {DatatableComponent} from "../../components/datatable/datatable.component";
import {UsersComponent} from "./home/users/users.component";
import {OrdersComponent} from "./home/orders/orders.component";
import {DashboardComponent} from "./home/dashboard/dashboard.component";
import {UpdateUserComponent} from "./home/users/update-user/update-user.component";
import {QRCodeModule} from "angularx-qrcode";
import {OrderDetailsComponent} from "./home/orders/order-details/order-details.component";
import {ItemsComponent} from "./home/items/items.component";
import { TrucksComponent } from './home/trucks/trucks.component';
import {CreateOrderComponent} from "./home/orders/create-order/create-order.component";

@NgModule({
  declarations: [
    HomeComponent,
    ItemsComponent,
    DatatableComponent,
    UsersComponent,
    OrdersComponent,
    DashboardComponent,
    UpdateUserComponent,
    OrderDetailsComponent,
    TrucksComponent,
    CreateOrderComponent
  ],
  imports: [
    RouterModule.forChild(homeRoutes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatRippleModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSortModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    FormsModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatDialogModule,
    MatTooltipModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatCardModule,
    MatListModule,
    QRCodeModule,
  ],
  providers: [],
  exports: [
    DatatableComponent
  ]
})
export class HomeModule {
}
