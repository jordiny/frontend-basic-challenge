import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AppConstants } from '../../app.constants';
import { AuthService } from '../../features/auth/services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthJWTInterceptor implements HttpInterceptor {

    private authService: AuthService;

    constructor(private injector: Injector, private router: Router) {
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.authService = this.injector.get(AuthService); // get it here within intercept

            if (this.authService.isAuthenticate()) {

                let authAppToken: string;
                authAppToken = JSON.parse(localStorage.getItem(AppConstants.LocalStorage.AppToken));

                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${authAppToken}`
                    }
                });
            } else {
                localStorage.removeItem(AppConstants.LocalStorage.Usuario); 
                localStorage.removeItem(AppConstants.LocalStorage.AppToken);
                this.router.navigate(['/auth']);
            }

        return next.handle(request).pipe(tap(() => { },
        (err: any) => {

            if (err instanceof HttpErrorResponse) {
                 if (err.status !== 401) {
                     return;
                 }
                 localStorage.removeItem(AppConstants.LocalStorage.Usuario); 
                 localStorage.removeItem(AppConstants.LocalStorage.AppToken);
                 this.router.navigate(['/auth']);

            }
        }));
    }

}
