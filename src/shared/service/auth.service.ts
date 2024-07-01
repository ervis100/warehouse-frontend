import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Auth} from "../model/auth.model";
import {catchError, map, Observable, of, throwError} from "rxjs";
import {environment} from "../../environment";
import {User} from "../model/user.model";

@Injectable({providedIn:"root"})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }

  private auth?:Auth | null;
  private user?:User | null;

  getToken(username: string, password: string): Observable<Auth> {
    return this.http
      .post<Auth>(environment.apiUrl + '/api/auth/login', {
        username: username,
        password: password,
      })
  }

  getAuthResponse(): Observable<Auth | null | undefined> {
    return of(this.auth);
  }

  getUser() {
    return of(this.user);
  }

  clearAuthAndRedirect(): void {
    localStorage.removeItem(environment.localStorageKeys.authUser);
    this.auth = null;
    this.router.navigateByUrl('/auth');
  }

  setAuthResponse(auth: Auth) {
    this.auth = auth;
    this.user = User.getInstance(this.auth.user);
    localStorage.setItem(
      environment.localStorageKeys.authUser,
      JSON.stringify(auth)
    );
  }

  redirectToHome() {
    this.router.navigateByUrl("/");
  }
}
