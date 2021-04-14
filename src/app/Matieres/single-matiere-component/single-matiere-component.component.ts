import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Matiere} from "../matiere.model";

@Component({
  selector: 'app-single-matiere-component',
  templateUrl: './single-matiere-component.component.html',
  styleUrls: ['./single-matiere-component.component.scss']
})
export class SingleMatiereComponentComponent implements OnInit {
  @Input()matiere: Matiere;
  @Output() onDelete: EventEmitter<string> = new EventEmitter<string>();
  @Output() onEdit: EventEmitter<string> = new EventEmitter<string>();
  
  constructor() { }

  ngOnInit(): void {
  }
}
