import {Component, Inject, OnInit} from '@angular/core';
import {Eleves} from "../eleves.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-eleve',
  templateUrl: './edit-eleve.component.html',
  styleUrls: ['./edit-eleve.component.scss']
})
export class EditEleveComponent implements OnInit {
  eleve: Eleves = null;
  formulaire: FormGroup = new FormGroup({
    nom: new FormControl('',[Validators.required]),
    prenom: new FormControl('',[Validators.required]),
  });
  constructor(private matdialogref: MatDialogRef<EditEleveComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
      this.eleve = data.eleve;
      this.formulaire.controls.nom.setValue(this.eleve.nom);
      this.formulaire.controls.prenom.setValue(this.eleve.nom);
  }

  ngOnInit(): void {
  }
  close(){
    this.matdialogref.close();
  }
  update(){
    this.matdialogref.close({
      submit:true,
      nom: this.formulaire.controls.nom.value,
      prenom: this.formulaire.controls.prenom.value,
    });
  }
}
