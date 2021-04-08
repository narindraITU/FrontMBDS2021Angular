import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProgressData} from "./ProgressData";

@Component({
  selector: 'app-progress',
  templateUrl: './ProgressComponent.html',
  styleUrls: ['./ProgressComponent.scss']
})
export class ProgressComponent {
  constructor(public dialogRef: MatDialogRef<ProgressComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ProgressData) { }
  closeDialog() {
    this.dialogRef.close();
  }
}
