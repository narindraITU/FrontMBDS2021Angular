import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {AuthService} from '../../shared/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MessagingService} from '../../shared/messaging.service';
import {Router} from '@angular/router';
import {catchError, mergeMap} from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login = '';
  password = '';

  constructor(private router: Router,
              private messagingService: MessagingService,
              public authService: AuthService) { }

  ngOnInit(): void {
    console.log('tesss');
  }
  connect(){
    const spinner = this.messagingService.createSpinner();
    this.authService.getToken(this.login, this.password).pipe(
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
  validated(): boolean{
    return this.login !== '' && this.password !== '';
  }
  inscription(){
    this.router.navigate(['/auth', 'register']);
  }
}
