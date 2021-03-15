import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AssignmentModel} from "../assignment.model";
import {AssignmentsService} from "../../shared/assignments.service";
import {Router} from "@angular/router";
import {MessagingService} from "../../shared/messaging.service";

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.scss']
})
export class AddAssignmentComponent implements OnInit {
  nomDevoir: string = '';
  dateDevoir: Date = new Date();

  constructor(private assignmentsService: AssignmentsService,
              private messagingService: MessagingService,
              private router: Router) { }

  ngOnInit(): void {
  }
  submit(){
    const newAssignment = new AssignmentModel();
    newAssignment.rendu = false;
    newAssignment.dateDeRendu = this.dateDevoir;
    newAssignment.nom = this.nomDevoir;
    const loader = this.messagingService.createSpinner();
    this.assignmentsService.addAssignment(newAssignment).subscribe(message => {
      loader.close();
      this.router.navigate(['/home']);
    }, error => {
      loader.close();
      this.messagingService.openSnackBar('Une erreur est survenue', 3000);
    });
  }
}
