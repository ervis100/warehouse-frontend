import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, take } from 'rxjs';
import {Auth} from "../model/auth.model";
import {environment} from "../../environment";
import {AuthService} from "../service/auth.service";
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.getAuthResponse().pipe(
      take(1),
      map((auth) => {
        if (!auth) {
          let authStorage: string | null = localStorage.getItem(
            environment.localStorageKeys.authUser
          );
          if (!authStorage) {
            this.authService.clearAuthAndRedirect();
            return false;
          }
          auth = Auth.getInstance(JSON.parse(authStorage));
          this.authService.setAuthResponse(auth);
        }
        return true;
      })
    );
  }
}
