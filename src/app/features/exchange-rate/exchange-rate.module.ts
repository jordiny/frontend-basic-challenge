import { ExchangeRateRoutingModule } from './exchange-rate-routing.module';
import { ExchangeRateComponent } from './exchange-rate.component';
import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms'; 
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ExchangeRateComponent,MainComponent,RegisterComponent],
  imports: [
    CommonModule,
    ExchangeRateRoutingModule,
    ReactiveFormsModule,
    SharedModule.forRoot()
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  exports: [RegisterComponent]
})
export class ExchangeRateModule { }
