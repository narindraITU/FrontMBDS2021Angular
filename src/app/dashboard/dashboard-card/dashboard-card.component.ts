import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss']
})
export class DashboardCardComponent implements OnInit {
  @Input()icone: string;
  @Input()texte: string;
  @Input() nombre: number;
  @Input() loading: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
