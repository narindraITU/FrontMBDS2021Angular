import {Component, Inject, OnInit} from '@angular/core';
import {Eleves} from "../eleves.model";
import {AssignmentModel} from "../../assigments/assignment.model";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AssignmentsService} from "../../shared/HttpServices/assignments.service";
import {MessagingService} from "../../shared/Others/messaging.service";
import {RendreModalComponent} from "../../assigments/rendre-modal/rendre-modal.component";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-descri-eleves',
  templateUrl: './descri-eleves.component.html',
  styleUrls: ['./descri-eleves.component.scss']
})
export class DescriElevesComponent implements OnInit {
  eleve: Eleves;
  liste: AssignmentModel[] = [];
  currentPage: number = 1;
  nombrePages: number = 0;
  nombreReponses: number = 0;
  constructor(private matDialogRef: MatDialogRef<DescriElevesComponent>,
              private matDialog: MatDialog,
              private messagingService: MessagingService,
              @Inject(MAT_DIALOG_DATA) data: {eleve: Eleves},
              private assignmentsService: AssignmentsService) {
    this.eleve = data.eleve;
  }

  refreshData(){
    const loader = this.messagingService.createSpinner();
    this.assignmentsService.byEleve(this.currentPage,this.eleve._id).subscribe(data => {
      console.log(data);
      this.liste = data.docs;
      this.nombrePages = data.totalPages;
      this.nombreReponses = data.totalDocs;
      loader.close();
    }, error => {
      console.log(error);
      loader.close();
      this.messagingService.openSnackBar('une erreur est survenue',3000);
    });
  }
  ngOnInit(): void {
    this.refreshData();
  }


  rendre(assignment: AssignmentModel) {
    console.log(assignment);
    const matdialog = this.matDialog.open<RendreModalComponent>(RendreModalComponent, {
      data: {assignment}
    });
    matdialog.afterClosed().subscribe(data => {
      if (data) {
        const loader = this.messagingService.createSpinner();
        this.assignmentsService.rendre(data.id, data.note, data.description).subscribe(data => {
          loader.close();
          this.messagingService.openSnackBar('Le devoir a été rendu', 3000);
          this.refreshData();
        }, error => {
          loader.close();
          this.messagingService.openSnackBar(error.data.message, 3000);
        });
      }
    });
  }

  updatePage($event: PageEvent) {
    console.log($event.pageIndex);
    this.currentPage = $event.pageIndex + 1;
    this.refreshData();
  }
}
