import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {AuthService} from '../../shared/HttpServices/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MessagingService} from '../../shared/Others/messaging.service';
import {Router} from '@angular/router';
import {catchError, mergeMap} from "rxjs/operators";
import {DashboardService} from "../../shared/HttpServices/dashboard.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login = '';
  password = '';

  constructor(private router: Router,
              private dashboardService: DashboardService,
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
        this.dashboardService.reloadCounts();
        return this.authService.me();
      }),
      catchError(error => {
        spinner.close();
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
