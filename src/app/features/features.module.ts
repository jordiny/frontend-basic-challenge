import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesRoutingModule } from './features-routing.module';
import { FeaturesComponent } from './features.component';
import { AuthModule } from './auth/auth.module';
import { FormsModule } from '@angular/forms';
import { DashboardModule } from './dashboard/dashboard.module';  
import { SharedModule } from '../shared/shared.module'; 
import { ExchangeRateModule } from './exchange-rate/exchange-rate.module';

@NgModule({
  declarations: [FeaturesComponent],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    AuthModule,
    FormsModule,
    DashboardModule,
    ExchangeRateModule,
    SharedModule.forRoot()
  ]
})
export class FeaturesModule {
static forRoot(): ModuleWithProviders<FeaturesModule> {
  return {
    ngModule: FeaturesModule,
    providers: [
    ],
  };
}
}
