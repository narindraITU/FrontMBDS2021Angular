import {NgModule} from '@angular/core';
import { FicheMatiereComponent } from './fiche-matiere/fiche-matiere.component';
import { ListeMatiereComponent } from './liste-matiere/liste-matiere.component';
import {MatieresComponent} from "./matieres.component";
import {MatieresRoutingModule} from "./matieres-routing.module";
import {MatCardModule} from "@angular/material/card";
import { SingleMatiereComponentComponent } from './single-matiere-component/single-matiere-component.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { NgpImagePickerModule } from 'ngp-image-picker';
import {IconPickerModule} from "ngx-icon-picker";
import {MatIconModule} from "@angular/material/icon";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    MatieresRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    NgpImagePickerModule,
    IconPickerModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule,
  ],
  exports: [],
  declarations: [
    MatieresComponent,
    FicheMatiereComponent,
    ListeMatiereComponent,
    SingleMatiereComponentComponent],
  providers: [],
})
export class MatieresModule {
}
