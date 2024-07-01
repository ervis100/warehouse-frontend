import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environment";
import {map, Observable} from "rxjs";
import {User} from "../model/user.model";

@Injectable({providedIn:"root"})
export class  UserService {
    constructor(private httpClient: HttpClient) {
    }

    public getUsers():Observable<any> {
        return this.httpClient.get<any[]>(environment.apiUrl + "/api/users").pipe(map(data=> {
            data.forEach((user)=> {
              user.roles = user.roles.map(role=>role.name)
            })
            return data;
        }))
    }

    getUser(userId: any) {
        return this.httpClient.get<any>(environment.apiUrl + `/api/users/${userId}`)
    }

    updateUser(userId , userData) {
        return this.httpClient.put<boolean>(environment.apiUrl + `/api/users/${userId}` , userData)
    }
}
