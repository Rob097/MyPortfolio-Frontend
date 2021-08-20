import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HelloComponent } from './components/hello/hello.component';
import { InfoComponent } from './components/info/info.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  {
    path: '',
    component: HelloComponent
  },
  {
    path: 'dashboard',
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
