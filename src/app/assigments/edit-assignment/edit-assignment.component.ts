import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AssignmentModel} from "../assignment.model";
import {AssignmentsService} from "../../shared/HttpServices/assignments.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MessagingService} from "../../shared/Others/messaging.service";

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.scss']
})
export class EditAssignmentComponent implements OnInit {
  nomDevoir: string = '';
  dateDevoir: Date = new Date();
  assignment: AssignmentModel = null;
  constructor(private assignmentsService: AssignmentsService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private messagingService: MessagingService) { }

  ngOnInit(): void {
    const index = this.activeRoute.snapshot.params.id;
    const loader = this.messagingService.createSpinner();
    this.assignmentsService.getAssignment(index).subscribe(data => {
      this.assignment = data;
      this.nomDevoir = this.assignment.nom;
      this.dateDevoir = this.assignment.dateDeRendu;
      loader.close();
    }, (error) => {
      this.messagingService.openSnackBar('Une erreur est survenue',3000);
      loader.close();
    });
  }
  submit(){
    if(this.nomDevoir && this.dateDevoir){
      this.assignment.nom = this.nomDevoir;
      this.assignment.dateDeRendu = this.dateDevoir;
      const loader = this.messagingService.createSpinner();
      this.assignmentsService.updateAssignment(this.assignment).subscribe(message => {
        this.router.navigate(['/assignment',this.assignment._id]);
        loader.close();
      },(error) => {
        this.messagingService.openSnackBar('Une erreur est survenue',3000);
        loader.close();
      });
    }
    return;
  }
}
