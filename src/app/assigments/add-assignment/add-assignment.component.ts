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
      secondCtrl: ['', Validators.required]
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

  FirstSubmit(){
    this.nomDevoir = this.firstFormGroup.get('firstCtrl').value;
    console.log(this.nomDevoir);
    console.log(this.dateDevoir);
  }
  SecondSubmit(){
    console.log(this.matiereItem);
    this.idmatiere = this.matiereItem;
    
    console.log(this.eleveItem);
    this.ideleve = this.eleveItem;
  }
  ThirdSubmit(){
    this.note = this.ThirdFormGroup.get('noteCtrl').value;
    console.log(this.note);
    
    this.remarque = this.ThirdFormGroup.get('remarqueItem').value;
    console.log(this.remarque);
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
