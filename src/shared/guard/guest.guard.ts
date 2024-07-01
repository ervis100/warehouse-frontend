import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {environment} from "../../../environments/environment";
import {AuthService} from "../service/auth.service";

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  constructor(private authService: AuthService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let authStorage: string|null = localStorage.getItem(environment.localStorageKeys.authUser);

    if (authStorage) {

      this.authService.redirectToHome();

      return false;
    }

    return true;
  }

}
