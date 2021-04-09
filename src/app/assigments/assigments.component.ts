import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {AssignmentModel} from "./assignment.model";
import {AssignmentsService} from "../shared/HttpServices/assignments.service";
import {MessagingService} from "../shared/Others/messaging.service";
import {CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {filter, map, pairwise, tap, throttleTime} from "rxjs/operators";

@Component({
  selector: 'app-assigments',
  templateUrl: './assigments.component.html',
  styleUrls: ['./assigments.component.scss']
})
export class AssigmentsComponent implements OnInit {
  titre= "Mon application est sur les Assignments";
  assignmentsRendus: AssignmentModel[] = [];
  pageRendus: Number;
  nextPageRendus: Number = 1;
  countAssignmentsRendus: Number;

  assignmentsNonRendus: AssignmentModel[] = [];
  pageNonRendus: Number;
  nextPageNonRendus: Number = 1;
  countAssignmentsNonRendus: Number;

  @ViewChild('scrollerRendus') scrollerRendus: CdkVirtualScrollViewport;
  @ViewChild('scrollerNonRendus') scrollerNonRendus: CdkVirtualScrollViewport;
  constructor(private readonly assignmentsService: AssignmentsService,
              private readonly messagingService: MessagingService,
              private ngZone: NgZone) { }

  ngOnInit(): void {
    this.getAssignmentsRendus();
    this.getAssignmentsNonRendus();
  }
  getAssignmentsRendus(){
    if (!this.nextPageRendus) return;
    this.assignmentsService
      .getAssignmentsPaginated(this.nextPageRendus,true)
      .subscribe((data: any) => {
        this.pageRendus = data.page;
        this.nextPageRendus = data.nextPage;
        this.countAssignmentsRendus = data.totalDocs;
        this.assignmentsRendus = this.assignmentsRendus.concat(data.docs);
      });
  }
  getAssignmentsNonRendus(){
    if (!this.nextPageNonRendus) return;
    this.assignmentsService
      .getAssignmentsPaginated(this.nextPageNonRendus,false)
      .subscribe((data: any) => {
        this.pageNonRendus = data.page;
        this.nextPageNonRendus = data.nextPage;
        this.countAssignmentsNonRendus = data.totalDocs;
        this.assignmentsNonRendus = this.assignmentsNonRendus.concat(data.docs);
      });
  }
  ngAfterViewInit() {
    this.scrollerRendus
      .elementScrolled()
      .pipe(
        // on transforme les evenements en distances par rapport au bas du scroll
        map((e) => {
          return this.scrollerRendus.measureScrollOffset('bottom');
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
          this.getAssignmentsRendus(); // déjà prêt car nextPage re-initialisé à chaque requête
        });
      });
    this.scrollerNonRendus
      .elementScrolled()
      .pipe(
        // on transforme les evenements en distances par rapport au bas du scroll
        map((e) => {
          return this.scrollerNonRendus.measureScrollOffset('bottom');
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
          this.getAssignmentsNonRendus(); // déjà prêt car nextPage re-initialisé à chaque requête
        });
      });
  }
}
