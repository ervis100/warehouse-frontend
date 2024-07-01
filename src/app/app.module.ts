import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MatButtonModule} from "@angular/material/button";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from "@angular/router";
import {GuestGuard} from "../shared/guard/guest.guard";
import {AuthGuard} from "../shared/guard/auth.guard";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "../shared/interceptor/auth.interceptor";

const appRoutes: Routes = [
    {
        path: 'auth',
        loadChildren: () =>
            import("../app/modules/auth/auth/auth.module").then((m) => m.AuthModule),
        canActivate: [GuestGuard],
    },
    {
        path: '',
        loadChildren: () =>
            import("../app/modules/home/home.module").then((m) => m.HomeModule),
        canActivate: [AuthGuard],
    },
];

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        RouterModule.forRoot(appRoutes),
        MatButtonModule,
        BrowserAnimationsModule,
        MatCard,
        MatCardHeader,
        MatIcon,
        MatError,
        MatCardActions,
        MatCardContent,
        MatFormField,
        MatLabel,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
            deps: [HttpClient],
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
