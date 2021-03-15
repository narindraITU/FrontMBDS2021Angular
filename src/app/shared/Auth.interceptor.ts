import {Injectable, Injector} from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private injector: Injector,
              private router: Router,) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request).pipe(catchError(err => {
        if ([401,403].includes(err.status)) {
          this.injector.get(AuthService).logout();
          this.router.navigate(['/auth','login']);
        }
        const error = err?.error?.message || err?.statusText || 'Une erreur est survenue';
        return throwError(error);
      }))
  }
}
