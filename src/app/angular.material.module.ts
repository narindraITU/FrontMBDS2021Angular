import {NgModule} from '@angular/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatNativeDateModule} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSidenavModule} from "@angular/material/sidenav";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatChipsModule} from "@angular/material/chips";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatStepperModule} from "@angular/material/stepper";
import {MatSelectModule} from "@angular/material/select";
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";

const modules = [
  MatSnackBarModule,
  MatNativeDateModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatDatepickerModule,
  MatCardModule,
  MatCheckboxModule,
  MatSlideToggleModule,
  MatProgressSpinnerModule,
  ScrollingModule,
  MatToolbarModule,
  MatIconModule,
  MatTooltipModule,
  MatSidenavModule,
  MatStepperModule,
  MatSelectModule,
  DragDropModule,
  MatChipsModule,
  MatButtonToggleModule,
  MatBottomSheetModule,
];
@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class AngularMaterialModule{}
