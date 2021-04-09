import {NgModule} from '@angular/core';
import {AssignmentDetailComponent} from "./assignment-detail/assignment-detail.component";
import {AssigmentsComponent} from "./assigments.component";
import {EditAssignmentComponent} from "./edit-assignment/edit-assignment.component";
import {AngularMaterialModule} from "../angular.material.module";
import {AssignmentsRoutingModule} from "./assignments-routing.module";
import {AddAssignmentComponent} from "./add-assignment/add-assignment.component";
import {FormsModule} from "@angular/forms";
import {CommonModule, DatePipe} from "@angular/common";
import { SingleAssignmentComponent } from './single-assignment/single-assignment.component';
import {DragDropModule} from "@angular/cdk/drag-drop";


@NgModule({
    imports: [
        AngularMaterialModule,
        AssignmentsRoutingModule,
        FormsModule,
        CommonModule,
        DragDropModule,
    ],
  declarations: [
    AssignmentDetailComponent,
    AssigmentsComponent,
    EditAssignmentComponent,
    AddAssignmentComponent,
    SingleAssignmentComponent,
  ],
})
export class AssignmentsModule {
}
