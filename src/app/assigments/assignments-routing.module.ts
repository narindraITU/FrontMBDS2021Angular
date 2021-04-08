import {NgModule} from '@angular/core';
import {Route, RouterModule, Routes} from "@angular/router";
import {AssigmentsComponent} from "./assigments.component";
import {AddAssignmentComponent} from "./add-assignment/add-assignment.component";
import {AssignmentDetailComponent} from "./assignment-detail/assignment-detail.component";
import {EditAssignmentComponent} from "./edit-assignment/edit-assignment.component";
import {AdminGuard} from "../shared/Guards/admin.guard";

const routes: Route[] = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: AssigmentsComponent,
  }, {
    path: 'add',
    component: AddAssignmentComponent,
  }, {
    path: 'assignment/:id',
    component: AssignmentDetailComponent,
  }, {
    path: 'assignment/:id/edit',
    component: EditAssignmentComponent,
    canActivate: [AdminGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssignmentsRoutingModule {
}
