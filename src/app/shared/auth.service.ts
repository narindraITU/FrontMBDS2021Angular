import {Injectable} from '@angular/core';
import {UserModel} from '../auth/login/user.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Configurations} from '../Configurations/configurations';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: BehaviorSubject<UserModel | null> = new BehaviorSubject<UserModel | null>(null);

  currentToken: string = null;
  suffix = 'user';

  constructor(private readonly httpClient: HttpClient) {
    const containedToken = localStorage.getItem('token');
    this.currentToken = !['null',null,''].includes(containedToken) ? containedToken : null;
    console.log("ato ? ");
  }

  setToken(token: string){
    localStorage.setItem('token',token);
    this.currentToken = token;
  }
  setUserInfo(usermodel: UserModel){
    this.currentUser.next(usermodel);
  }
  getUserInfo(): Observable<UserModel | null>{
    return new Observable(fn => this.currentUser.subscribe(fn));
  }
  getToken(username: string, password: string): Observable<any>{
    return this.httpClient.post<any>(Configurations.baseURI + this.suffix + '/login', {
      username,
      password,
    });
  }
  me(): Observable<UserModel>{
    return this.httpClient.get<UserModel>(Configurations.baseURI + this.suffix + '/me');
  }

  inscription(username: string, password: string, isAdmin: boolean): Observable<any>{
    return this.httpClient.post<any>(Configurations.baseURI + this.suffix + '/inscription', {
      name: username,
      password,
      isAdmin,
    });
  }

  logout(){
    this.currentToken = null;
    localStorage.removeItem('token');
    this.currentUser.next(null);
  }
  isLoggedIn(){
    return this.currentToken != null;
  }
  isAdmin(){
    return this.isLoggedIn() && this.currentUser.value.isAdmin;
  }
}
