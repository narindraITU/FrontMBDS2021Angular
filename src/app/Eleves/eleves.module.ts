import {NgModule} from '@angular/core';
import { ListeElevesComponent } from './liste-eleves/liste-eleves.component';
import {ElevesComponent} from "./eleves.component";
import {ElevesRoutingModule} from "./eleves-routing.module";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import { EditEleveComponent } from './edit-eleve/edit-eleve.component';
import {MatButtonModule} from "@angular/material/button";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";

@NgModule({
  imports: [
    ElevesRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
  ],
  exports: [],
  declarations: [
    ElevesComponent,
    ListeElevesComponent,
    EditEleveComponent],
  providers: [],
})
export class ElevesModule {
}
