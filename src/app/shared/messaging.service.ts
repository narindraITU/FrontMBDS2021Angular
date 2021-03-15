import {Injectable} from "@angular/core";
import {MatSnackBar, MatSnackBarRef, SimpleSnackBar} from "@angular/material/snack-bar";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {SpinnerComponent} from "../BaseComponents/Spinner/SpinnerComponent";

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  constructor(private snackbar: MatSnackBar, private dialog: MatDialog) {
  }
  openSnackBar(message: string, duration: number, action: string = 'Fermer'): MatSnackBarRef<SimpleSnackBar> {
    return this.snackbar.open(message, action, {
      duration
    });
  }
  createSpinner(): MatDialogRef<SpinnerComponent> {
    return this.dialog.open(SpinnerComponent, {
      width: '250px',
      height: '250px',
      panelClass: 'transparent-bck'
    });
  }
}
