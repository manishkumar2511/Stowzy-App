import { Routes } from '@angular/router';
import { HomeComponent } from './_menus/Home/home/home.component';
import { LoginComponent } from './_menus/login-signup/login/login.component';
import { SignupComponent } from './_menus/login-signup/signup/signup.component';
import { RoomOwnerLoginComponent } from './_menus/login-signup/login/action/room-owner-login/room-owner-login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'room-owner-login', component: RoomOwnerLoginComponent },
];
