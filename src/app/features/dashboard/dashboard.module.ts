import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MainComponent } from './components/main/main.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [DashboardComponent, MainComponent],
  imports: [
    CommonModule, 
    DashboardRoutingModule,
    ReactiveFormsModule,
    SharedModule.forRoot()
  ]
})
export class DashboardModule { }
