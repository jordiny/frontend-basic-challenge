import { ExchangeRateComponent } from './exchange-rate.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component'; 

const routes: Routes = [{
  path: '',
  component: ExchangeRateComponent,
  data: {
    breadcrumb: 'HOME',
    path: 'home'
  },
  children: [
    {
      path: '',
      component: MainComponent,
      data: {
        breadcrumb: 'Generar tipo cambio',
        path: 'exchange-rate'
      }
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExchangeRateRoutingModule { }
