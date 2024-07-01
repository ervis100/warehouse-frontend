import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {AuthService} from "../../../../shared/service/auth.service";
import {User} from "../../../../shared/model/user.model";
import {map, Observable, Subject, takeUntil} from "rxjs";
import {environment} from "../../../../environment";
import {MenuLink} from "../../../../shared/interfaces/menu.interface";
import {menuLinks} from "../../../../shared/menu";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
    public appName: string = environment.appName;
    public opened: boolean = true;
    public links?: MenuLink[];
    public user?: User;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    public makeVisible: boolean = false;

    constructor(
        private authService: AuthService,
        public dialog: MatDialog,
        private snackbar: MatSnackBar,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.authService.getUser().pipe(takeUntil(this._unsubscribeAll)).subscribe(user => {
            this.user = user;
            if (!!this.user) {
                this.links = menuLinks.filter(link => this.user?.hasAnyRole(link.roles) || link.roles[0] == "*");
            }
        });
    }

    logout() {
        this.authService.clearAuthAndRedirect()
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.unsubscribe();
    }

    hide(): void {
        this.makeVisible = !this.makeVisible;
    }
}
