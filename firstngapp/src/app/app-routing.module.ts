import { NgModule } from '@angular/core';


import { RouterModule , Routes  } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { Path } from './routes.enum';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CanloaddashboardService } from './canloaddashboard.service';

const routes : Routes = [
  {path : '' , redirectTo : Path.LOGIN , pathMatch:'full'},
  {path : Path.LOGIN , component: LoginComponent}, 
  {path : Path.DASHBOARD , component:DashboardComponent , canActivate:[CanloaddashboardService]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
