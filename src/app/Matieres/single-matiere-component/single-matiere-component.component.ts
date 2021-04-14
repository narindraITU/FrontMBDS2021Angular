import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Matiere} from "../matiere.model";
import {AuthService} from "../../shared/HttpServices/auth.service";

@Component({
  selector: 'app-single-matiere-component',
  templateUrl: './single-matiere-component.component.html',
  styleUrls: ['./single-matiere-component.component.scss']
})
export class SingleMatiereComponentComponent implements OnInit {
  @Input()matiere: Matiere;
  @Output() onDelete: EventEmitter<string> = new EventEmitter<string>();
  @Output() onEdit: EventEmitter<string> = new EventEmitter<string>();
<<<<<<< HEAD
  
  constructor() { }
=======
  constructor(public authService: AuthService) { }
>>>>>>> origin/Feat/M/Matiere_Chargement_Eleves

  ngOnInit(): void {
  }
}
