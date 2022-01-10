import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
  
import { AppConstants } from '../../app.constants';
import { ToastrService } from 'ngx-toastr';
 
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url: string;
  constructor(
    private http: HttpClient,
    private toastr: ToastrService
    // private afs:AngularFirestore
  ) { }

  private formatErrors(operation: any) {
    return (err: any) => {
      const errMsg = `error in ${operation}() recuperando ${this.url}`;
      console.log(`${errMsg}:`, err);
      if(err instanceof HttpErrorResponse) {
          // you could extract more info about the error if you want, e.g.:
          console.log(`status: ${err.status}, ${err.statusText}`);
          // errMsg = ...
          if (err.status === 401) {
            this.toastr.warning("Su sesión ha expirado/no tiene permiso.",AppConstants.TitulosToastr.Warning);
          }else if(err.status == 0){
            this.toastr.error(AppConstants.MensajeGenericoToast.Error.replace("mensaje", "No hay conexión, servicio no disponible."),
            'Error al consultar servicio  ' , {
              enableHtml: true,
              closeButton: true,
              tapToDismiss: false,
              disableTimeOut: true
            });
          }else{
            this.toastr.error(AppConstants.MensajeGenericoToast.Error.replace("mensaje",errMsg),
            'Error al consultar servicio  ' , {
              enableHtml: true,
              closeButton: true,
              tapToDismiss: false,
              disableTimeOut: true
            });
          }
      }
      err.message = errMsg;
      return Observable.throw(err); //errMsg
    }
    //return throwError(operation.error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    this.url = `${environment.apiBaseServiceUrl}${path}`;
    return this.http.get<Response>(this.url, { params })
      .pipe(catchError(this.formatErrors('get')));
  }

  put(path: string, body: Object = {}): Observable<any> {
    this.url = `${environment.apiBaseServiceUrl}${path}`;
    return this.http.put<Response>(
      this.url,
      JSON.stringify(body)
    ).pipe(catchError(this.formatErrors('put')));
  }

  post(path: string, body: Object = {}): Observable<any> {
    this.url = `${environment.apiBaseServiceUrl}${path}`;
    return this.http.post<any>(
      this.url
      , body,
    ).pipe( //catchError(this.formatErrors)
    catchError(this.formatErrors('post')),
  // catchError(err => {
  //     console.log('caught rethrown error, providing fallback value');
  //     return of([]);
  // })
    )
    ;
  }

  delete(path): Observable<any> {
    this.url = `${environment.apiBaseServiceUrl}${path}`;
    return this.http.delete<Response>(
      this.url,
    ).pipe(catchError(this.formatErrors('delete')));
  }

  download(path: string, dto: Object): Observable<Blob> {
    return this.http.post<Blob>(`${environment.apiBaseServiceUrl}${path}`, dto,
      { responseType: 'blob' as 'json' });
  }
/*
******firebase********************************
************************************************************************************
*/



}
