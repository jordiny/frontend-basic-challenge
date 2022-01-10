import { Injectable } from '@angular/core';
import {of as observableOf,Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppConstants } from 'src/app/app.constants';
import { ApiService } from 'src/app/core/services/api.service'; 
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiService: ApiService) {
  }
 
  login(username: string , password: string) {

    const url = `/users/authenticate`;
    const result = this.apiService.post(url, { username, password})
      .pipe(
        catchError( error => {
          if ( !(error.error instanceof ErrorEvent)) {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            if (error.status === 404) {
              // return of(true);
            }
          }
          let data = {
            Message: "Error de conexión con el servicio. Servicio no disponible."
          }
          return of(data);
        }),
        map((res) => {
        console.log(res);
        return res;
      }));
    //return result;

  return result;

  }

  isAuthenticate(): boolean {
    let authAppToken: { value: '' };
    authAppToken = JSON.parse(localStorage.getItem(AppConstants.LocalStorage.AppToken));
    //console.log(authAppToken);
    if (authAppToken == null || authAppToken == undefined) {
      return false;
    } else {
        return true;
    }

  }



  private getUserFromLocalStorage(): Usuario {
    return JSON.parse(localStorage.getItem(AppConstants.LocalStorage.Usuario));
  }

  getLoggedUser(): Observable<Usuario> {
    return observableOf(this.getUserFromLocalStorage());
  }

  setLoggedUser(usuario: Usuario) {
    localStorage.setItem(AppConstants.LocalStorage.Usuario, JSON.stringify(usuario));
  }

  setLogOut() {
    localStorage.removeItem(AppConstants.LocalStorage.Usuario); 
    localStorage.removeItem(AppConstants.LocalStorage.AppToken);
  }


  setToken(token: string) {
    let authAppToken: string;
    authAppToken = JSON.parse(localStorage.getItem(AppConstants.LocalStorage.AppToken));
    if (authAppToken == null || authAppToken == undefined) {
      authAppToken=token;
    }
    localStorage.setItem(AppConstants.LocalStorage.AppToken, JSON.stringify(authAppToken));
  }

  getLogo(): string {
    return "";
  }
 
}
