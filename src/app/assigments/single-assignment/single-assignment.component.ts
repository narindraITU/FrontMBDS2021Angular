import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AssignmentModel} from "../assignment.model";
import {Router} from "@angular/router";
import {AuthService} from "../../shared/HttpServices/auth.service";

@Component({
  selector: 'app-single-assignment',
  templateUrl: './single-assignment.component.html',
  styleUrls: ['./single-assignment.component.scss']
})
export class SingleAssignmentComponent implements OnInit {
  @Input()assignment: AssignmentModel;
  @Output()rendre: EventEmitter<AssignmentModel> = new EventEmitter<AssignmentModel>();

  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {}

  info() {
    this.router.navigate(['/main','assignment',this.assignment._id])
  }
}
