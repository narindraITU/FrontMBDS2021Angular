import {Component, Inject, OnInit} from '@angular/core';
import {AssignmentModel} from "../assignment.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Editor} from "ngx-editor";

@Component({
  selector: 'app-rendre-modal',
  templateUrl: './rendre-modal.component.html',
  styleUrls: ['./rendre-modal.component.scss']
})
export class RendreModalComponent implements OnInit {
  assignment: AssignmentModel;
  remarqueeditor: Editor;
  formulaire: FormGroup = new FormGroup({
    note: new FormControl(0,[Validators.required,Validators.min(0),Validators.max(20)]),
    description: new FormControl('',[Validators.required]),
  });

  constructor(private matDialog: MatDialogRef<RendreModalComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.assignment = data.assignment;
    this.formulaire.controls.note.setValue(this.assignment.note ? this.assignment.note : 0);
    this.formulaire.controls.description.setValue(this.assignment.remarques ? this.assignment.remarques: "");
  }

  ngOnInit(): void {
    this.remarqueeditor = new Editor();
  }
  close(){
    this.matDialog.close();
  }

  submit() {
    this.matDialog.close({
      id: this.assignment._id,
      ...this.formulaire.value
    });
  }
}
