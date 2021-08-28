import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './authentication/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InfoComponent } from './components/info/info.component';
import { UserComponent } from './components/user/user.component';

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
      component: LoginComponent
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
