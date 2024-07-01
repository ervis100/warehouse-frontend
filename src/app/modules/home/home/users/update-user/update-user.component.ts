import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../../../shared/service/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../../../../../shared/model/user.model";

@Component({
    selector: 'app-update-user',
    templateUrl: './update-user.component.html',
    styleUrl: './update-user.component.css'
})
export class UpdateUserComponent implements OnInit {
    constructor(
        private userService: UserService,
        private router: Router,
        private activeRoute: ActivatedRoute,
    ) {
    }

    public roles = [
        {
            id: 1,
            name: "ROLE_CLIENT"
        },
        {
            id: 2,
            name: "ROLE_WAREHOUSE_MANAGER"
        },
        {
            id: 3,
            name: "ROLE_SYSTEM_ADMIN"
        },
    ];

    public user?: User;

    public userForm: FormGroup = new FormGroup<any>({
        firstname: new FormControl('', [Validators.required]),
        lastname: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        username: new FormControl('', [Validators.required]),
        role: new FormControl('', [Validators.required])
    });

    ngOnInit(): void {
        let userId = this.activeRoute.snapshot.params['id'];
        this.userService.getUser(userId).subscribe(user => {
            this.user = user;
            this.userForm.setValue({
                firstname: user.firstname,
                lastname: user.lastname,
                username: user.username,
                email: user.email,
                role: user.roles[0].id
            })
        })
    }

    submit() {
        let updatedUser = this.userForm.value;
        this.userService.updateUser(this.user.id, updatedUser).subscribe(response => {
        })
    }
}
