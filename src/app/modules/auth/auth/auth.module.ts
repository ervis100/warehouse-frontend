import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatTooltipModule} from "@angular/material/tooltip";
import {AuthComponent} from "./auth.component";

const authRoutes: Routes = [
  {
    path: '',
    component: AuthComponent
  }
];


@NgModule({

  declarations: [
    AuthComponent
  ],
  imports: [
    RouterModule.forChild(authRoutes),
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
    MatTooltipModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AuthModule {}
