import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Path } from '../routes.enum';
import { InterfaceComponent } from './interface/interface.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CanloaddashboardService } from '../canloaddashboard.service';

const routes: Routes = [
  {path : Path.DASHBOARD , canActivate:[CanloaddashboardService] ,canLoad:[CanloaddashboardService] , component:DashboardComponent ,children :[
    {path : Path.INTERFACE , component : InterfaceComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes),ReactiveFormsModule],
  exports: [RouterModule]
})
export class DashboardInterfaceRoutingModule { }
