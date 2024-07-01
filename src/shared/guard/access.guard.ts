import {inject, Injectable, InjectionToken} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {AppState} from "../store/app.state";
import {selectAuth} from "../store/auth/auth.selectors";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccessGuard {
  static role(role: string) {
    return new InjectionToken<CanActivate>('AccessGuardWithRoles', {
        providedIn: 'root',
        factory: () => {
            const store: Store<AppState> = inject(Store);

            return {
              canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
                return store.pipe(select(selectAuth)).pipe(
                  map((auth) => auth.user.hasRole(role))
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
            const store: Store<AppState> = inject(Store);

            return {
              canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
                return store.pipe(select(selectAuth)).pipe(
                  map((auth) => auth.user.hasAnyRole(roles))
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
            const store: Store<AppState> = inject(Store);

            return {
              canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
                return store.pipe(select(selectAuth)).pipe(
                  map((auth) => auth.user.hasAllRoles(roles))
                );
              }
            }
        }
    });
  }
}
