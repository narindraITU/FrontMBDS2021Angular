import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {AuthService} from "../../shared/HttpServices/auth.service";
import {MessagingService} from "../../shared/Others/messaging.service";
import {AssignmentsService} from "../../shared/HttpServices/assignments.service";
import {AssignmentModel} from "../assignment.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-action-sheet',
  templateUrl: './action-sheet.component.html',
  styleUrls: ['./action-sheet.component.scss']
})
export class ActionSheetComponent implements OnInit {
  assignment: AssignmentModel;
  constructor(private bottomSheetRef: MatBottomSheetRef<ActionSheetComponent>,
              private messagingService: MessagingService,
              private assignmentsService: AssignmentsService,
              private router:  Router,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: {assignment: AssignmentModel},
              private authService: AuthService) {
    this.assignment = data.assignment;
  }


  ngOnInit(): void {}
  close(){
    this.bottomSheetRef.dismiss();
  }
  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

  delete() {
    const loader = this.messagingService.createSpinner();
    this.assignmentsService.deleteAssignment(this.assignment).subscribe(data => {
      this.messagingService.openSnackBar('Le devoir a été supprimé', 3000);
      this.bottomSheetRef.dismiss();
      this.router.navigate(['/main']);
      loader.close();
    }, error => {
      this.messagingService.openSnackBar('Une erreur est survenue', 3000);
      console.log(error);
      loader.close();
    });
  }

  maj() {
    this.router.navigate(['/main','assignment',this.assignment._id,'edit']);
    this.bottomSheetRef.dismiss();
  }

  fermer() {
    this.bottomSheetRef.dismiss();
  }
}
