import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "./shared/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {AssignmentsService} from "./shared/assignments.service";
import {MessagingService} from "./shared/messaging.service";
import {UserModel} from "./auth/login/user.model";
import {MatDrawer} from "@angular/material/sidenav";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
    title = 'Assignments by Mathias - 53 et Narindra - 41';
    currentUser: UserModel = null;
    isMenuShown: boolean = false;
    @ViewChild('drawer',{static: false}) drawer: MatDrawer = null;
    constructor(private readonly authService: AuthService,
                private readonly router: Router,
                private readonly activeRoute: ActivatedRoute,
                private readonly messagingService: MessagingService,
                private readonly assignmentService: AssignmentsService) {}


  ngOnInit(): void {
    console.log(this.authService.currentToken);
    if(this.authService.currentToken){
      const loader = this.messagingService.createSpinner();
      this.authService.me().subscribe(data => {
        this.authService.setUserInfo(data);
        loader.close();
      });
    }
    this.authService.getUserInfo().subscribe(data => this.currentUser = data);
  }
  showUserInfo(){

  }
  isOnLogin(): boolean{
      return this.router.url == '/auth/login';
  }
  disconnect(){
    this.authService.logout();
    this.router.navigate(['/auth','login']);
  }
  goToLogin(){
    this.router.navigate(['/auth','login']);
  }
  isConnected(){
        return this.authService.isLoggedIn();
  }

  peuplerLaBase() {
    const loader = this.messagingService.createSpinner();
    this.assignmentService.peuplerBDJoin().subscribe(data => {
      this.messagingService.openSnackBar('La base a été peuplée',3000);
      loader.close();
    }, error => {
      this.messagingService.openSnackBar('Une erreur est survenue',3000);
      loader.close();
    });
  }
}
