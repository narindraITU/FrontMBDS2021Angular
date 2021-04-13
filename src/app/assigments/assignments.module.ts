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
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import {NgxEditorModule} from 'ngx-editor';
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatChipsModule} from "@angular/material/chips";
import { RendreModalComponent } from './rendre-modal/rendre-modal.component';

@NgModule({
  imports: [
    AngularMaterialModule,
    AssignmentsRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatSelectModule,
    NgxEditorModule,
    DragDropModule,
    MatChipsModule,
  ],
  declarations: [
    AssignmentDetailComponent,
    AssigmentsComponent,
    EditAssignmentComponent,
    AddAssignmentComponent,
    SingleAssignmentComponent,
    RendreModalComponent,
  ],
})
export class AssignmentsModule {
}
