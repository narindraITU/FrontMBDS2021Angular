import { NgModule } from '@angular/core';
import {Routes, RouterModule, Route} from '@angular/router';
import {ElevesComponent} from "./eleves.component";
import {ListeElevesComponent} from "./liste-eleves/liste-eleves.component";

const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'main',
  },
  {
    path: 'main',
    component: ElevesComponent,
    children: [
      {
        path: '',
        component: ListeElevesComponent,
      },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElevesRoutingModule { }
