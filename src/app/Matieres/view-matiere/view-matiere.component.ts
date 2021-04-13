import { Component, Input, OnInit } from '@angular/core';
import { Matiere } from '../matiere.model';

@Component({
  selector: 'app-view-matiere',
  templateUrl: './view-matiere.component.html',
  styleUrls: ['./view-matiere.component.scss']
})
export class ViewMatiereComponent implements OnInit {
  @Input() matiere: Matiere;
  constructor() { }

  ngOnInit(): void {
  }

}
