import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AssignmentModel} from "../assignment.model";
import {Observable} from "rxjs";
import {AssignmentsService} from "../../shared/HttpServices/assignments.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../shared/HttpServices/auth.service";
import {MessagingService} from "../../shared/Others/messaging.service";

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.scss']
})
export class AssignmentDetailComponent implements OnInit {
  assignementTransmis: AssignmentModel;
  constructor(private readonly assignmentsService: AssignmentsService,
              private readonly activatedroute: ActivatedRoute,
              private readonly authService: AuthService,
              private readonly messagingService: MessagingService,
              private readonly router: Router,) { }

  ngOnInit(): void {
    const numero = this.activatedroute.snapshot.params.id;
    const loader = this.messagingService.createSpinner();
    this.assignmentsService.getAssignment(numero).subscribe(data => {
      this.assignementTransmis = data;
      loader.close();
    }, error => {
      this.messagingService.openSnackBar('Une erreur est survenue', 4000);
      loader.close();
    });
  }

  onAssignmentRendu(){
    if(this.assignementTransmis.note != 0){
      this.assignementTransmis.rendu = true;
      const loader = this.messagingService.createSpinner();
      this.assignmentsService.updateAssignment(this.assignementTransmis).subscribe(data => {
        loader.close();
        this.router.navigate(['main/home']);
      }, error => {
        this.messagingService.openSnackBar('Une erreur est survenue', 4000);
        loader.close();
      });
    }
  }
  deleteAssignment(){
    const loader = this.messagingService.createSpinner();
    this.assignmentsService.deleteAssignment(this.assignementTransmis).subscribe(data => {
      this.router.navigate(['main/home']);
      loader.close();
    }, error => {
      this.messagingService.openSnackBar('Une erreur est survenue', 4000);
      loader.close();
    });
  }
  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  onClickEdit() {
    this.router.navigate(['/main', 'assignment',this.assignementTransmis._id,'edit'])
  }
}
