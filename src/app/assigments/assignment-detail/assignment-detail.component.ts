import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AssignmentModel} from "../assignment.model";
import {Observable} from "rxjs";
import {AssignmentsService} from "../../shared/HttpServices/assignments.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../shared/HttpServices/auth.service";
import {MessagingService} from "../../shared/Others/messaging.service";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {ActionSheetComponent} from "../action-sheet/action-sheet.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {RendreModalComponent} from "../rendre-modal/rendre-modal.component";

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.scss']
})
export class AssignmentDetailComponent implements OnInit {
  assignementTransmis: AssignmentModel;
  id: string = null;
  constructor(private readonly assignmentsService: AssignmentsService,
              private readonly activatedroute: ActivatedRoute,
              private readonly matDialog: MatDialog,
              private readonly authService: AuthService,
              private _bottomSheet: MatBottomSheet,
              private readonly messagingService: MessagingService,
              private readonly router: Router,) { }

  ngOnInit(): void {
    this.id = this.activatedroute.snapshot.params.id;
    this.refreshData();
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
  openSheet(){
    const actionSheet = this._bottomSheet.open<ActionSheetComponent>(ActionSheetComponent, {
      data: {
        assignment: this.assignementTransmis,
      }
    });
  }
  refreshData(){
    const loader = this.messagingService.createSpinner();
    this.assignmentsService.getAssignment(this.id).subscribe(data => {
      this.assignementTransmis = data;
      loader.close();
    }, error => {
      this.messagingService.openSnackBar('Une erreur est survenue', 4000);
      loader.close();
    });
  }
  rendre(){
    const matdialog = this.matDialog.open<RendreModalComponent>(RendreModalComponent, {
      data: {assignment: this.assignementTransmis}
    });
    matdialog.afterClosed().subscribe(data => {
      if(data){
        const loader = this.messagingService.createSpinner();
        this.assignmentsService.rendre(data.id,data.note,data.description).subscribe(data => {
          loader.close();
          this.messagingService.openSnackBar('Le devoir a été rendu',3000);
          this.refreshData();
        }, error => {
          loader.close();
          this.messagingService.openSnackBar(error.data.message,3000);
        });
      }
      else{
        this.assignementTransmis.rendu = false;
      }
    });
  }
  nePasRendre(){
    const loader = this.messagingService.createSpinner();
    this.assignmentsService.annulerRendre(this.assignementTransmis._id).subscribe(data => {
      loader.close();
      this.messagingService.openSnackBar("Le rendu du devoir a été annulé",3000);
      this.refreshData();
    }, error => {
      loader.close();
      this.messagingService.openSnackBar(error.data.message,3000);
    });
  }
  update($event: boolean) {
    $event ? this.rendre() : this.nePasRendre();
  }
}
