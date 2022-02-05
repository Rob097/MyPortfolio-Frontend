import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './authentication/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InfoComponent } from './components/info/info.component';
import { UserComponent } from './components/user/user.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuardService } from "./helpers/guards/auth-guard.service";
import { NotAuthGuardService } from "./helpers/guards/not-auth-guard.service";
import { SignupComponent } from './authentication/signup/signup.component';
import { ProfileModule } from './components/profile/profile.module';

/* This is the modulo used for the routes. It is bind to app.module.ts */
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
      path: 'info',
      component: InfoComponent
  },
  {
      path: 'user',
      component: UserComponent
  },
  {
      path: 'login',
      component: LoginComponent,
      canActivate: [NotAuthGuardService]
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [NotAuthGuardService]
  },
  {
    path        : 'profile',
    component: ProfileComponent,
    loadChildren: () => ProfileModule
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
