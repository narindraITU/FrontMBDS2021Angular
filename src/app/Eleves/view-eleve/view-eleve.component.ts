import { Component, Input, OnInit } from '@angular/core';
import { Eleves } from '../eleves.model';

@Component({
  selector: 'app-view-eleve',
  templateUrl: './view-eleve.component.html',
  styleUrls: ['./view-eleve.component.scss']
})
export class ViewEleveComponent implements OnInit {
  @Input() eleve: Eleves;
  constructor() { }

  ngOnInit(): void {
  }

}
