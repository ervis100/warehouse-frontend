import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {Auth} from "../model/auth.model";
import {environment} from "../../environment";
import {AuthService} from "../service/auth.service";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService
    ) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (
            req.url.endsWith('/api/auth/login')
        ) {
            return next.handle(req);
        }

        let auth: Auth = Auth.getInstance(
            JSON.parse(localStorage.getItem(environment.localStorageKeys.authUser))
        );

        // if (req.url.endsWith('/api/auth/refresh-token')) {
        //   let newReq = req.clone({
        //     headers: req.headers.set(
        //       'Authorization',
        //       'Bearer ' + auth.token.refreshToken
        //     ),
        //   });
        //   return next.handle(newReq);
        // }

        let newReq = req.clone({
            headers: req.headers.set(
                'Authorization',
                'Bearer ' + auth.accessToken
            ),
        });

        return next.handle(newReq).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.authService.clearAuthAndRedirect();
                }

                throw error;
            })
        );
    }
}
