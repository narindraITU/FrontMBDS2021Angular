import { NgModule } from '@angular/core';
import {Routes, RouterModule, Route} from '@angular/router';
import {MatieresComponent} from "./matieres.component";
import {ListeMatiereComponent} from "./liste-matiere/liste-matiere.component";
import {FicheMatiereComponent} from "./fiche-matiere/fiche-matiere.component";
const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'main',
  },
  {
    path: 'main',
    component: MatieresComponent,
    children: [
      {
        path: '',
        component: ListeMatiereComponent,
      },
      {
        path: 'fiche/:id',
        component: FicheMatiereComponent,
      }
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatieresRoutingModule{ }
