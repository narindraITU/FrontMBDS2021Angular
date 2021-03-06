import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MessagingService} from '../../shared/Others/messaging.service';
import {AuthService} from '../../shared/HttpServices/auth.service';
import {catchError, mergeMap} from "rxjs/operators";
import {DashboardService} from "../../shared/HttpServices/dashboard.service";

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
              private dashboardService: DashboardService,
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
}
