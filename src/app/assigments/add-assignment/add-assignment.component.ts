import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AssignmentModel} from "../assignment.model";
import {Matiere} from "../../Matieres/matiere.model";
import {Eleves} from "../../Eleves/eleves.model";
import {AssignmentsService} from "../../shared/HttpServices/assignments.service";
import {MatieresService} from "../../shared/HttpServices/matieres.service";
import {ElevesService} from "../../shared/HttpServices/eleves.service";
import {Router} from "@angular/router";
import {MessagingService} from "../../shared/Others/messaging.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Editor , schema, toDoc, toHTML} from 'ngx-editor';


@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.scss']
})
export class AddAssignmentComponent implements OnInit {
  nomDevoir: string = '';
  dateDevoir: Date = new Date();
  idmatiere: string;
  ideleve: string;
  matieres: Matiere[] = [];
  eleves: Eleves[] = [];
  note: number;
  remarque: string;
  
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  ThirdFormGroup: FormGroup;
  FourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  sixthFormGroup: FormGroup;

  matiereItem: string;
  eleveItem: string;

  remarqueeditor: Editor;
  remarqueItem: '';

  constructor(private assignmentsService: AssignmentsService,
              private messagingService: MessagingService,
              private router: Router,
              private matieresService: MatieresService,
              private _formBuilder: FormBuilder,
              private elevesService: ElevesService) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.ThirdFormGroup = this._formBuilder.group({
      ThirdCtrl: ['', Validators.required]
    });
    this.FourthFormGroup = this._formBuilder.group({
      fourthCtrl: ['', Validators.required]
    });
    this.fifthFormGroup = this._formBuilder.group({
      noteCtrl: ['']
    });
    this.sixthFormGroup = this._formBuilder.group({
      remarqueItem: ['']
    });
    this.getMatieres();
    this.getEleves();
    this.remarqueeditor = new Editor();
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
  submit(){
    const newAssignment = new AssignmentModel();
    newAssignment.rendu = false;
    newAssignment.dateDeRendu = this.dateDevoir;
    newAssignment.nom = this.nomDevoir;
    newAssignment.idMatiere = this.idmatiere;
    newAssignment.idEleve = this.ideleve;
    newAssignment.note = this.note;
    newAssignment.remarques = this.remarque;

    console.log("Show newAssignment !!!!!!!!!!!!!!!!!!!");
    console.log(newAssignment);

    const loader = this.messagingService.createSpinner();
    this.assignmentsService.addAssignment(newAssignment).subscribe(message => {
      loader.close();
      this.router.navigate(['main/home']);
    }, error => {
      loader.close();
      this.messagingService.openSnackBar('Une erreur est survenue', 3000);
    });
  }

  nameSubmit(){
    this.nomDevoir = this.firstFormGroup.get('firstCtrl').value;
    console.log(this.nomDevoir);
  }

  dateSubmit(){
    console.log(this.dateDevoir);
  }
  matiereSubmit(){
    console.log(this.matiereItem);
    this.idmatiere = this.matiereItem;
  }
  eleveSubmit(){
    console.log(this.eleveItem);
    this.ideleve = this.eleveItem;
  }
  noteSubmit(){
    this.note = this.fifthFormGroup.get('noteCtrl').value;
    console.log(this.note);
  }
  remarqueSubmit(){
    this.remarque = this.sixthFormGroup.get('remarqueItem').value;
    console.log(this.remarque);
  }
}
