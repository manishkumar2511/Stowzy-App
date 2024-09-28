import { Routes } from '@angular/router';
import { HomeComponent } from './_menus/Home/home/home.component';
import { LoginComponent } from './_menus/login-signup/login/login.component';
import { SignupComponent } from './_menus/login-signup/signup/signup.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
];
