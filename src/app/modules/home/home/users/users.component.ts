import {Component, OnDestroy, OnInit} from '@angular/core';
import {TableColumn} from "../../../../../shared/interfaces/TableInterfaces/table-column";
import {User} from "../../../../../shared/model/user.model";
import {UserService} from "../../../../../shared/service/user.service";
import {Subject, take, takeUntil} from "rxjs";
import {TableAction} from "../../../../../shared/interfaces/TableInterfaces/table-action";
import {Router} from "@angular/router";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit, OnDestroy {

    constructor(
        private userService: UserService,
        private router: Router
    ) {
    }

    private unsubAll = new Subject();
    public data: User[] = [];
    public columns: TableColumn[] = [
        {
            name: "id",
            prop: "id",
            searchable: false,
            orderable: false,
            hidden: false,
            objectProperty: null,
            render: null
        },
        {
            name: "firstname",
            prop: "firstname",
            searchable: false,
            orderable: false,
            hidden: false,
            objectProperty: null,
            render: null
        },
        {
            name: "lastname",
            prop: "lastname",
            searchable: false,
            orderable: false,
            hidden: false,
            objectProperty: null,
            render: null
        },
        {
            name: "username",
            prop: "username",
            searchable: false,
            orderable: false,
            hidden: false,
            objectProperty: null,
            render: null
        },
        {
            name: "email",
            prop: "email",
            searchable: false,
            orderable: false,
            hidden: false,
            objectProperty: null,
            render: null
        },
        {
            name: "role",
            prop: "roles",
            searchable: false,
            orderable: false,
            hidden: false,
            objectProperty: null,
            render: null
        },
    ]

    public tableActions: TableAction[] = [
        {
            title: "update",
            action: "update",
            icon: "new",
        },
    ]

    actionClicked(event) {
        if (event.action == 'update') {
            this.router.navigate(['users', event.row.id]);
        }
    }

    ngOnInit(): void {
        this.userService.getUsers().pipe(takeUntil(this.unsubAll)).subscribe(data => {
            this.data = data;
        });
    }

    ngOnDestroy(): void {
        this.unsubAll.next(null);
        this.unsubAll.unsubscribe();
    }
}
