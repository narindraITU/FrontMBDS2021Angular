import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MessagingService} from '../../shared/messaging.service';
import {AuthService} from '../../shared/auth.service';
import {catchError, mergeMap} from "rxjs/operators";

@Component({
  selector: 'app-register-component',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})

export class RegisterComponent implements OnInit {
  login = '';
  password = '';
  isAdmin = false;
  constructor(private router: Router,
              private messagingService: MessagingService,
              public authService: AuthService) { }

  ngOnInit(): void {}
  connect(){
    this.router.navigate(['/auth', 'login']);
  }
  validated(): boolean{
    return this.login !== '' && this.password !== '';
  }
  inscription(){
    const spinner = this.messagingService.createSpinner();
    this.authService.inscription(this.login, this.password,this.isAdmin).pipe(
      mergeMap(data => {
        this.authService.setToken(data.token);
        return this.authService.me();
      }),
      catchError(error => {
        throw error;
      })
    ).subscribe(data => {
      this.authService.setUserInfo(data);
      spinner.close();
      this.router.navigate(['/main','home']);
    }, error => {
      this.messagingService.openSnackBar(error?.error?.message || 'L\'utilisateur n\'existe pas', 3000);
      spinner.close();
    });
  }
}
