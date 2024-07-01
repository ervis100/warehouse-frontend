import {Role} from "./role.model";

export class User {
    constructor(
        public id: number,
        public firstname: string,
        public lastname: string,
        public email: string,
        public username: string,
        public roles: Array<Role>,
    ) {
    }

    static getInstance(params: any) {
        return new User(
            params.id,
            params.firstname,
            params.lastname,
            params.email,
            params.username,
            params.roles,
        )
    }

    hasRole(roleName: string): boolean {
        return !!this.roles.find(role => role.name == roleName);
    }

    hasAnyRole(roles: string[]): boolean {
        let value: boolean = false;
        let roleNames = this.roles.map(role => role.name);
        roles.forEach(role => {
            if (roleNames.includes(role)) {
                value = true;
            }
        });
        return value;
    }


    hasAllRoles(roles: string[]): boolean {
        let value = true;
        let roleNames = this.roles.map(role => role.name);
        roles.forEach(role => {
            if (!roleNames.includes(role)) {
                value = false;
            }
        });

        return value;
    }
}
