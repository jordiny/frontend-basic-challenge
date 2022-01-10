import { Injectable } from '@angular/core'; 
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/services/api.service';
@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {

  constructor(private apiService: ApiService) {}
  search(data: any) {
    const url = `/exchange-rates`;
    const resultado = this.apiService.get(url).pipe(
      map((res) => {
        return res;
      })
    );
    return resultado;
  }
    
  update(data: any) {
    const url = `/exchange-rates/updateValue`;
    const resultado = this.apiService.post(url, data).pipe(
      map((res) => {
        return res;
      })
    );
    return resultado;
  } 

  calculate(data: any) {
    const url = `/exchange-rates/calculate`;
    const resultado = this.apiService.post(url, data).pipe(
      map((res) => {
        return res;
      })
    );
    return resultado;
  } 
}
