import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Matiere} from "../matiere.model";
import {AuthService} from "../../shared/HttpServices/auth.service";
import {MessagingService} from "../../shared/Others/messaging.service";
import { MatieresService } from "../../shared/HttpServices/matieres.service";

@Component({
  selector: 'app-single-matiere-component',
  templateUrl: './single-matiere-component.component.html',
  styleUrls: ['./single-matiere-component.component.scss']
})
export class SingleMatiereComponentComponent implements OnInit {
  @Input()matiere: Matiere;
  @Output() onDelete: EventEmitter<string> = new EventEmitter<string>();
  @Output() onEdit: EventEmitter<string> = new EventEmitter<string>();

  constructor(private messagingService: MessagingService,
              private matiereServices: MatieresService,
              public authService: AuthService) { }

  ngOnInit(): void {
  }
}
