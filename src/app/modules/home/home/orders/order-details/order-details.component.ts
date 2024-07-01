import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {OrderService} from "../../../../../../shared/service/order.service";

@Component({
    selector: 'app-order-details',
    templateUrl: './order-details.component.html',
    styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent implements OnInit{
    constructor(
        private activatedRoute: ActivatedRoute,
        private orderService: OrderService) {
    }

    public order:any;
    url = "http://192.168.1.3:4200/orders/"
    // url = "http://localhost:4200/orders/"
    dataStr = "";
    ngOnInit(): void {
        let orderId = this.activatedRoute.snapshot.params['id'];
        this.orderService.getOrder(orderId).subscribe(value=>{
            this.dataStr = this.url + orderId
            this.order = value;
        })
    }

    orderStatus = [
        "CREATED",
        "SHIPPED",
        "CANCELED",
        "DELIVERED",
        "RECEIVED",
    ]

}
