import {inject, Injectable, InjectionToken} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {map, Observable} from "rxjs";
import {AuthService} from "../service/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AccessGuard {
  constructor(private router: Router, private authService: AuthService) {}

  static role(role: string) {
    return new InjectionToken<CanActivate>('AccessGuardWithRoles', {
        providedIn: 'root',
        factory: () => {
            const authService: AuthService = inject(AuthService);

            return {
              canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
                return authService.getUser().pipe(
                  map((user) => !!user && user.hasRole(role))
                );
              }
            }
        }
    });
  }
  static anyRole(roles: string[]) {
    return new InjectionToken<CanActivate>('AccessGuardWithRoles', {
        providedIn: 'root',
        factory: () => {
          const authService: AuthService = inject(AuthService);

            return {
              canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
                return authService.getUser().pipe(
                  map((user) => !!user && user.hasAnyRole(roles))
                );
              }
            }
        }
    });
  }
  static allRoles(roles: string[]) {
    return new InjectionToken<CanActivate>('AccessGuardWithRoles', {
        providedIn: 'root',
        factory: () => {
          const authService: AuthService = inject(AuthService);

            return {
              canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
                return authService.getAuthResponse().pipe(
                  map((auth) => !!auth && auth.user.hasAllRoles(roles))
                );
              }
            }
        }
    });
  }
}
