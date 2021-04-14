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
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.scss']
})
export class EditAssignmentComponent implements OnInit {
  dateDevoir: Date = new Date();
  idmatiere: string;
  ideleve: string;
  matieres: Matiere[] = [];
  eleves: Eleves[] = [];
  assignment: AssignmentModel = null;
  matiereItem: string;
  eleveItem: string;

  remarqueeditor: Editor;
  currentMatiere: Matiere = null;
  currentEleve: Eleves = null;

  formulaire: FormGroup = new FormGroup({
      remarque: new FormControl(''),
      nom: new FormControl('',[Validators.required]),
      note: new FormControl('',[Validators.min(0),Validators.max(20)]),
      matiere: new FormControl('',[Validators.required]),
      eleve: new FormControl('', [Validators.required]),
  });
  constructor(private assignmentsService: AssignmentsService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private messagingService: MessagingService,
              private matieresService: MatieresService,
              private elevesService: ElevesService) {
  }

  async ngOnInit() {
    this.remarqueeditor = new Editor();
    const index = this.activeRoute.snapshot.params.id;
    const loader = this.messagingService.createSpinner();
    try{
      this.matieres = (await this.matieresService.loadAll().toPromise()).data;
      this.eleves = (await this.elevesService.loadAll().toPromise()).data;
      this.assignmentsService.getAssignment(index).subscribe(data => {
        this.assignment = data;
        this.dateDevoir = this.assignment.dateDeRendu;
        console.log(this.assignment);
        this.matiereItem = this.assignment.matiere._id;
        this.eleveItem = this.assignment.eleve._id;
        this.formulaire.controls.nom.setValue(this.assignment.nom);
        this.formulaire.controls.matiere.setValue(this.assignment.matiere._id);
        this.formulaire.controls.eleve.setValue(this.assignment.eleve._id);
        this.formulaire.controls.note.setValue("" + this.assignment.note);
        this.formulaire.controls.note.valueChanges.subscribe(data => {
          console.log(this.formulaire.controls.note.errors);
        });
        this.formulaire.controls.remarque.setValue(this.assignment.remarques);
        this.currentEleve = this.eleves.filter(value => value._id === this.eleveItem)[0];
        this.currentMatiere = this.matieres.filter(value => value._id === this.matiereItem)[0];
        loader.close();
      }, (error) => {
        this.messagingService.openSnackBar('Une erreur est survenue',3000);
        loader.close();
      });
    }
    catch (e) {
      loader.close();
      console.log(e);
      this.messagingService.openSnackBar('Une erreur est survenue', 3000);
    }
  }
  submit(){
      this.assignment.nom = this.formulaire.controls.nom.value;
      this.assignment.dateDeRendu = this.dateDevoir;
      this.assignment.idMatiere = this.idmatiere;
      this.assignment.idEleve = this.ideleve;
      this.assignment.note = this.formulaire.controls.note.value ? this.formulaire.controls.note.value : null;
      this.assignment.remarques = this.formulaire.controls.remarque.value;
      console.log(this.assignment);
      const loader = this.messagingService.createSpinner();
      this.assignmentsService.updateAssignment(this.assignment).subscribe(message => {
        this.router.navigate(['main/assignment',this.assignment._id]);
        this.messagingService.openSnackBar('Le devoir a été créé',3000);
        loader.close();
      },(error) => {
        this.messagingService.openSnackBar('Une erreur est survenue',3000);
        loader.close();
      });
  }

  onMatiereChange(){
    console.log("Matiere changed");
     var result = this.matieres.filter(item => {
      return item._id === this.matiereItem
    });
    this.currentMatiere = result[0];
    this.formulaire.controls.matiere.setValue(this.currentMatiere._id);
  }

  onEleveChange(){
    console.log("Eleve changed");
    var result = this.eleves.filter(item => {
      return item._id === this.eleveItem
    });
    this.currentEleve = result[0];
    this.formulaire.controls.eleve.setValue(this.currentEleve._id);
  }
}
