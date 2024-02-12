import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './_helpers/auth.guard';
import { RegistrationComponent } from './components/registration/registration.component';
import { loginGuard } from './_helpers/login.guard';

export const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [authGuard], canActivateChild: [authGuard] },
  { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
  { path: 'registration', component: RegistrationComponent },
  { path: '**', redirectTo: 'home' },
];
