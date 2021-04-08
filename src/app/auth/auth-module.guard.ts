import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment
} from '@angular/router';
import {AuthService} from "../shared/HttpServices/auth.service";

@Injectable({providedIn: 'root'})
export class AuthModuleGuard implements CanLoad {
  constructor(private authservice: AuthService,
              private router: Router) {}

  canLoad(route: Route, segments: UrlSegment[]){
    return !this.authservice.isLoggedIn() ? true : this.router.navigate(['/main','home']);
  }
}
