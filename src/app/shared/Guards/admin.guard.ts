import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthService} from '../HttpServices/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate{

  constructor(private readonly authService: AuthService,
              private readonly router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot){
    return this.authService.isAdmin() ? true :  this.router.navigate(['/main']);
  }
}
