import {NgModule} from '@angular/core';
import {Route, RouterModule} from "@angular/router";
import {ElevesComponent} from "../Eleves/eleves.component";
import {ListeElevesComponent} from "../Eleves/liste-eleves/liste-eleves.component";
import {DashboardPageComponent} from "./dashboard-page/dashboard-page.component";

const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'main',
  },
  {
    path: 'main',
    component: DashboardPageComponent,
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
