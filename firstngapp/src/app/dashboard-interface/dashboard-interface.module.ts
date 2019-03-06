import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';


import { DashboardInterfaceRoutingModule } from './dashboard-interface-routing.module';
import { InterfaceComponent } from './interface/interface.component';
import { SearchComponent } from './search/search.component';
import { PaginationPipe } from './pagination.pipe';
import { PaginationOptionsComponent } from './pagination-options/pagination-options.component';
import { ValidationComponent } from './validation/validation.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardInterfaceRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [InterfaceComponent, SearchComponent, PaginationPipe, PaginationOptionsComponent, ValidationComponent]
})
export class DashboardInterfaceModule { }
