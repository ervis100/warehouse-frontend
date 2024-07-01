// form.component.ts

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators, FormControl} from '@angular/forms';
import {Item} from "../../../../../../shared/model/Items";
import {ItemService} from "../../../../../../shared/service/item.service";
import {OrderService} from "../../../../../../shared/service/order.service";
import {UserService} from "../../../../../../shared/service/user.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-form',
    templateUrl: './create-order.component.html',
    styleUrls: ['./create-order.component.css']
})

export class CreateOrderComponent implements OnInit {
    constructor(
        private orderService: OrderService,
        private itemService: ItemService,
        private router: Router,
        private matSnackBar: MatSnackBar
    ) {
    }

    agencies = [];
    users = [];
    items: Item[] = [];
    createOrderForm = new FormGroup<any>({
        // submittedDate: new FormControl(null, Validators.required),
        deadLine: new FormControl(null, Validators.required),
        items: new FormArray([]),
    });
    dataLoaded = false;

    ngOnInit(): void {
        this.itemService.getItems().subscribe(response => {
            this.items = response;

            this.addItem();
            this.dataLoaded = true;
        });
    }


    submit() {
        let formValue = this.createOrderForm.value;

        this.orderService.createOrder(formValue).subscribe(value => {
            this.router.navigate(["orders"]);
        }, error => {
            console.log(error)
            this.matSnackBar.open(error.error.errors[0].detail, "Close", {
                verticalPosition: "top",
                horizontalPosition: "center",
                duration: 4000
            })
        })
    }

    get formItems() {
        return (<FormArray>this.createOrderForm.get("items")).controls;
    }

    removeItem(i: number) {
        (<FormArray>this.createOrderForm.get('items')).removeAt(i);
    }

    addItem() {
        (<FormArray>this.createOrderForm.get('items')).push(
            new FormGroup({
                itemId: new FormControl(null, Validators.required),
                quantity: new FormControl(null, Validators.required)
            })
        );
    }
}
