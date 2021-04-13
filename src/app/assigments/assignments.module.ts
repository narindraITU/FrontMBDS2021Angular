import {NgModule} from '@angular/core';
import {AssignmentDetailComponent} from "./assignment-detail/assignment-detail.component";
import {AssigmentsComponent} from "./assigments.component";
import {EditAssignmentComponent} from "./edit-assignment/edit-assignment.component";
import {AngularMaterialModule} from "../angular.material.module";
import {AssignmentsRoutingModule} from "./assignments-routing.module";
import {AddAssignmentComponent} from "./add-assignment/add-assignment.component";
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import {CommonModule, DatePipe} from "@angular/common";
import { SingleAssignmentComponent } from './single-assignment/single-assignment.component';
import {NgxEditorModule} from 'ngx-editor';
import { RendreModalComponent } from './rendre-modal/rendre-modal.component';
import { ActionSheetComponent } from './action-sheet/action-sheet.component';

@NgModule({
    imports: [
        AngularMaterialModule,
        AssignmentsRoutingModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        NgxEditorModule,
    ],
  declarations: [
    AssignmentDetailComponent,
    AssigmentsComponent,
    EditAssignmentComponent,
    AddAssignmentComponent,
    SingleAssignmentComponent,
    RendreModalComponent,
    ActionSheetComponent,
  ],
})
export class AssignmentsModule {
}
