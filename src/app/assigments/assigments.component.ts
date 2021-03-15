import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {AssignmentModel} from "./assignment.model";
import {AssignmentsService} from "../shared/assignments.service";
import {MessagingService} from "../shared/messaging.service";
import {CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {filter, map, pairwise, tap, throttleTime} from "rxjs/operators";

@Component({
  selector: 'app-assigments',
  templateUrl: './assigments.component.html',
  styleUrls: ['./assigments.component.scss']
})
export class AssigmentsComponent implements OnInit {
  titre= "Mon application est sur les Assignments";
  assignments: AssignmentModel[] = [];
  page: Number;
  nextPage: Number = 1;
  countAssignments: Number;
  @ViewChild('scroller') scroller: CdkVirtualScrollViewport;
  constructor(private readonly assignmentsService: AssignmentsService,
              private readonly messagingService: MessagingService,
              private ngZone: NgZone) { }

  ngOnInit(): void {
    this.getAssignments();
  }
  getAssignments(){
    if (!this.nextPage) return;
    this.assignmentsService
      .getAssignmentsPagine(this.nextPage)
      .subscribe((data: any) => {
        this.page = data.page;
        this.nextPage = data.nextPage;
        this.countAssignments = data.totalDocs;
        this.assignments = this.assignments.concat(data.docs);
      });
  }
  ngAfterViewInit() {
    this.scroller
      .elementScrolled()
      .pipe(
        // on transforme les evenements en distances par rapport au bas du scroll
        map((e) => {
          return this.scroller.measureScrollOffset('bottom');
        }),
        tap((val) => {
        }),
        pairwise(),
        filter(([y1, y2]) => {
          return y2 < y1 && y2 < 140;
        }),
        throttleTime(200) // on n'enverra un subscribe que toutes les 200ms (on ignorera les evenements entre...)
      )
      .subscribe((_) => {
        this.ngZone.run(() => {
          this.getAssignments(); // déjà prêt car nextPage re-initialisé à chaque requête
        });
      });
  }
}
