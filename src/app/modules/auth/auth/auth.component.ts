import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../shared/service/auth.service";
import {Subject, takeUntil} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnDestroy {
  constructor(
    private authService: AuthService,
    private snackBarService: MatSnackBar
  ) {
  }

  private unsubAll = new Subject();
  public hide: boolean = true;
  public authForm: FormGroup = new FormGroup<any>({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  });

  submit() {
    if (this.authForm.valid) {
      let formVal = this.authForm.value;
      this.authService.getToken(formVal.username, formVal.password).pipe(takeUntil(this.unsubAll)).subscribe(response => {
        this.authService.setAuthResponse(response);
        this.authService.redirectToHome();
      }, (errorResponse: HttpErrorResponse) => {
        this.snackBarService.open(errorResponse.error.errors[0].detail, "Close", {
          verticalPosition: "bottom",
          horizontalPosition: "center",
          duration: 3000
        })
      });
    }
  }

  ngOnDestroy(): void {
    this.unsubAll.next(null);
    this.unsubAll.unsubscribe();
  }
}
