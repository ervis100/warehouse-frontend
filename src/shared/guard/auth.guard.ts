import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { environment } from '../../../environments/environment';
import { Auth } from '../model/auth.model';

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
        let tokenExpirationTime: number;
        let refreshTokenExpirationTime: number;

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

        // tokenExpirationTime = auth.token.expiredDate - new Date().getTime();
        // refreshTokenExpirationTime =
        //   auth.token.refreshTokenExp - new Date().getTime();

        if (refreshTokenExpirationTime > 0) {
          setTimeout(() => {
            this.authService.clearAuthAndRedirect();
          }, refreshTokenExpirationTime);

          if (tokenExpirationTime > 0) {
            setTimeout(() => {
              this.authService.refreshToken();
            }, tokenExpirationTime);
          } else if (tokenExpirationTime < 0) {
            this.authService.refreshToken();
          }
        } else if (refreshTokenExpirationTime < 0) {
          this.authService.clearAuthAndRedirect();
        }

        return true;
      })
    );
  }
}
