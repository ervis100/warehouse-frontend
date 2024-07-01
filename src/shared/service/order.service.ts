import {Inject, Injectable, LOCALE_ID} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environment";
import {Order} from "../model/order.model";
import {OrderStatus} from "../model/OrderStatus.enum";
import {formatDate} from "@angular/common";

@Injectable({providedIn: "root"})
export class OrderService {
    constructor(private httpClient: HttpClient,
                @Inject(LOCALE_ID) private locale: string
    ) {
    }

    createOrder(order: Order) {
        let payload: any = {...order};
        payload.deadLine = formatDate(order.deadLine, "yyyy-MM-dd", this.locale);
        return this.httpClient.post<any>(environment.apiUrl + "/api/orders", payload)
    }

    getAgencies() {
        return this.httpClient.get<any[]>(environment.apiUrl + "/api/agencies")
    }

    getOrder(orderId: any) {
        return this.httpClient.get<any>(environment.apiUrl + "/api/orders/" + orderId)
    }

    createPackage(newPackage: any) {
        return this.httpClient.post(environment.apiUrl + "/api/transporters/make-package", newPackage)
    }

    getPackage(packageId: any) {
        return this.httpClient.get<any>(environment.apiUrl + "/api/transporters/package/" + packageId)
    }

    getClientOrders(orderStatus: string) {
        let params = {};
        if (orderStatus !== null && orderStatus !== "ALL") {
            params = new HttpParams().set('status', orderStatus);
        }
        return this.httpClient.get<Order[]>(environment.apiUrl + "/api/orders/client", {params})
    }

    getManagerOrders(orderStatus: string) {
        let params = {};
        if (orderStatus !== null && orderStatus !== "ALL") {
            params = new HttpParams().set('status', orderStatus);
        }
        return this.httpClient.get<Order[]>(environment.apiUrl + "/api/orders", {params})
    }
}
