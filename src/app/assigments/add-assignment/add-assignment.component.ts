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
import { Editor } from 'ngx-editor';


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

  matiereItem: string;
  eleveItem: string;

  remarqueeditor: Editor;
  remarqueItem: '';
  currentMatiere: any = null;
  currentEleve: any = null;

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
      matiere: ['', Validators.required],
      eleve: ['',Validators.required],
    });
    this.ThirdFormGroup = this._formBuilder.group({
      noteCtrl: [''],
      remarqueItem: ['']
    });
    this.getMatieres();
    this.getEleves();
    this.remarqueeditor = new Editor();
  }

  getMatieres(){
    const loader = this.messagingService.createSpinner();
    this.matieresService.loadAll().subscribe((data: any) => {
      this.matieres = data.data;
      loader.close();
    }, error => {
      console.log(error);
      this.messagingService.openSnackBar('Une erreur est survenue',3000);
    });
  }

  getEleves(){
    const loader = this.messagingService.createSpinner();
    this.elevesService.loadAll().subscribe((data: any) => {
      this.eleves = data.data;
      loader.close();
    }, error => {
      console.log(error);
      loader.close();
      this.messagingService.openSnackBar('Une erreur est survenue',3000);
    });
  }
  submit(){
    const newAssignment = new AssignmentModel();
    newAssignment.rendu = false;
    newAssignment.dateDeRendu = this.dateDevoir;
    newAssignment.nom = this.firstFormGroup.controls.firstCtrl.value;
    newAssignment.idMatiere = this.currentMatiere._id;
    newAssignment.idEleve = this.currentEleve._id;
    newAssignment.note = this.ThirdFormGroup.controls.noteCtrl.value ? this.ThirdFormGroup.controls.noteCtrl.value: null;
    newAssignment.remarques = this.ThirdFormGroup.controls.remarqueItem.value;

    const loader = this.messagingService.createSpinner();
    this.assignmentsService
      .addAssignment(newAssignment)
      .subscribe(message => {
      loader.close();
      this.router.navigate(['main/home']);
    }, error => {
      loader.close();
      this.messagingService.openSnackBar('Une erreur est survenue', 3000);
    });
  }


  onMatiereChange(){
     var result = this.matieres.filter(item => {
      return item._id === this.matiereItem
    });
    this.currentMatiere = result[0];
    this.secondFormGroup.controls.matiere.setValue(this.currentMatiere._id);
  }

  onEleveChange(){
    var result = this.eleves.filter(item => {
      return item._id === this.eleveItem
    });
    this.currentEleve = result[0];
    this.secondFormGroup.controls.eleve.setValue(this.currentEleve._id);
  }
}
