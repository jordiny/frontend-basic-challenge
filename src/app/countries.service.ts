import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
baseUrl:string;

  constructor(private httpClient:HttpClient) {
   this.baseUrl="https://restcountries.eu/rest/v2/regionalbloc/eu";
   }

   getAll():Promise<any[]>{

    return this.httpClient.get<any[]>(this.baseUrl).toPromise();

   }


}
