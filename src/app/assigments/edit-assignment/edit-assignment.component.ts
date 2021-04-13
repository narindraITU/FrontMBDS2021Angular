import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AssignmentModel} from "../assignment.model";
import {AssignmentsService} from "../../shared/HttpServices/assignments.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MessagingService} from "../../shared/Others/messaging.service";
import { Matiere } from 'src/app/Matieres/matiere.model';
import { Eleves } from 'src/app/Eleves/eleves.model';
import { MatieresService } from 'src/app/shared/HttpServices/matieres.service';
import { ElevesService } from 'src/app/shared/HttpServices/eleves.service';
import { Editor } from 'ngx-editor';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.scss']
})
export class EditAssignmentComponent implements OnInit {
  nomDevoir: string = '';
  dateDevoir: Date = new Date();
  idmatiere: string;
  ideleve: string;
  matieres: Matiere[] = [];
  eleves: Eleves[] = [];
  note: number;
  remarque: string;
  assignment: AssignmentModel = null;
  matiereItem: string;
  eleveItem: string;

  remarqueeditor: Editor;
  currentMatiere: any = null;
  currentEleve: any = null;
  
  constructor(private assignmentsService: AssignmentsService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private messagingService: MessagingService,
              private matieresService: MatieresService,
              private elevesService: ElevesService) { }

  ngOnInit(): void {
    this.getMatieres();
    this.getEleves();
    this.remarqueeditor = new Editor();
    const index = this.activeRoute.snapshot.params.id;
    const loader = this.messagingService.createSpinner();
    this.assignmentsService.getAssignment(index).subscribe(data => {
      this.assignment = data;
      this.nomDevoir = this.assignment.nom;
      this.dateDevoir = this.assignment.dateDeRendu;
      this.matiereItem = this.assignment.matiere._id;
      this.eleveItem = this.assignment.eleve._id;
      this.note = this.assignment.note;
      this.remarque = this.assignment.remarques;

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
      this.assignment.idMatiere = this.matiereItem;
      this.assignment.idEleve = this.eleveItem;
      this.assignment.note = this.note;
      this.assignment.remarques = this.remarque;
      console.log(this.assignment);
      const loader = this.messagingService.createSpinner();
      this.assignmentsService.updateAssignment(this.assignment).subscribe(message => {
        this.router.navigate(['main/assignment',this.assignment._id]);
        loader.close();
      },(error) => {
        this.messagingService.openSnackBar('Une erreur est survenue',3000);
        loader.close();
      });
    }
    return;
  }

  getMatieres(){
    this.matieresService.loadAll().subscribe((data: any) => {
      this.matieres = this.matieres.concat(data.data);
    });
  }

  getEleves(){
    this.elevesService.loadAll().subscribe((data: any) => {
      console.log(data);
      this.eleves = this.eleves.concat(data.data);
    });
  }

  onMatiereChange(){
    console.log("Matiere changed");
     var result = this.matieres.filter(item => {
      return item._id === this.matiereItem
    })
    this.currentMatiere = result[0];
    console.log(this.currentMatiere);
  }

  onEleveChange(){
    console.log("Eleve changed");
    var result = this.eleves.filter(item => {
      return item._id === this.eleveItem
    })
    this.currentEleve = result[0];
    console.log(this.currentEleve);
  }
}
