import {Component, Input, OnInit} from '@angular/core';
import {AssignmentModel} from "../assignment.model";

@Component({
  selector: 'app-single-assignment',
  templateUrl: './single-assignment.component.html',
  styleUrls: ['./single-assignment.component.scss']
})
export class SingleAssignmentComponent implements OnInit {
  @Input()assignment: AssignmentModel;
  constructor() { }

  ngOnInit(): void {
  }

}
