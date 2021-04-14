import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {AssignmentModel} from "./assignment.model";
import {AssignmentsService} from "../shared/HttpServices/assignments.service";
import {MessagingService} from "../shared/Others/messaging.service";
import {CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {filter, map, pairwise, startWith, tap, throttleTime} from "rxjs/operators";
import {CdkDragDrop} from "@angular/cdk/drag-drop";
import {MatDialog} from "@angular/material/dialog";
import {RendreModalComponent} from "./rendre-modal/rendre-modal.component";
import {forkJoin, Observable} from "rxjs";
import {ProgressComponent} from "../BaseComponents/Progress/ProgressComponent";
import {DashboardService} from "../shared/HttpServices/dashboard.service";
import {Matiere} from "../Matieres/matiere.model";
import {MatAutocomplete, MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {FormControl} from "@angular/forms";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatieresService} from "../shared/HttpServices/matieres.service";

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


  matiere_control: FormControl = new FormControl();
  @ViewChild('matiereInput') input: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  assignmentsNonRendus: AssignmentModel[] = [];
  pageNonRendus: Number;
  nextPageNonRendus: Number = 1;
  countAssignmentsNonRendus: Number;
  filteredMatieres: Observable<Matiere[]>;
  selectedMatieres: Matiere[] = [];
  matieres: Matiere[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild('scrollerRendus') scrollerRendus: CdkVirtualScrollViewport;
  @ViewChild('scrollerNonRendus') scrollerNonRendus: CdkVirtualScrollViewport;

  constructor(private readonly assignmentsService: AssignmentsService,
              private readonly matdialog: MatDialog,
              private readonly matiereService: MatieresService,
              private dashboardService: DashboardService,
              private readonly messagingService: MessagingService,
              private ngZone: NgZone) {
    this.filteredMatieres = this.matiere_control.valueChanges.pipe(
      startWith(null),
      map((matiere: string | null) => matiere ? this._filter(matiere) : this.getDiffBetweenTabs()));
  }
  getDiffBetweenTabs(){
    return this.matieres.filter(value => this.selectedMatieres.indexOf(value) === -1);
  }

  peuplerLaBase() {
    const spinner = this.messagingService.createSpinner();
    const progress = this.matdialog.open(ProgressComponent, {
      width: '500px',
      height: '150px',
      data: {progress: 0}
    });
    const observables = this.assignmentsService
      .peuplerBDJoin();
    let nombre = observables.length;
    let progression = 0;
    forkJoin(
      observables.map(o => o.pipe(tap(() => {
        progress.componentInstance.data.progress = Math.round(100 * progression/ nombre);
        return progression++;
      })))).subscribe(data => {
          this.messagingService.openSnackBar('la base a été peuplée',3000);
          this.dashboardService.reloadCounts();
          progress.close();
          spinner.close();
      }, error => {
          this.messagingService.openSnackBar('Une erreur est survenue',3000);
          progress.close();
          spinner.close();
    });
  }
  ngOnInit(): void {
    const loader = this.messagingService.createSpinner();
    this.matiereService.loadAll().subscribe(data => {
      this.matieres = data.data;
      loader.close();
    }, error => {
      loader.close();
      this.messagingService.openSnackBar('Une erreur est survenue durant le chargement des matières', 3000);
    });
    this.getAssignmentsRendus();
    this.getAssignmentsNonRendus();
  }
  refreshData(){
    this.nextPageRendus = 1;
    this.nextPageNonRendus = 1;
    this.assignmentsRendus = [];
    this.assignmentsNonRendus = [];
    this.getAssignmentsRendus();
    this.getAssignmentsNonRendus();
  }
  getAssignmentsRendus(){
    if (!this.nextPageRendus) return;
    return this.assignmentsService
      .getAssignmentsPaginated(this.nextPageRendus,true,this.selectedMatieres)
      .subscribe((data: any) => {
        this.pageRendus = data.page;
        this.nextPageRendus = data.nextPage;
        this.countAssignmentsRendus = data.totalDocs;
        this.assignmentsRendus = this.assignmentsRendus.concat(data.docs);
      });
  }
  getAssignmentsNonRendus(){
    if (!this.nextPageNonRendus) return;
    return this.assignmentsService
      .getAssignmentsPaginated(this.nextPageNonRendus,false,this.selectedMatieres)
      .subscribe((data: any) => {
        this.pageNonRendus = data.page;
        this.nextPageNonRendus = data.nextPage;
        this.countAssignmentsNonRendus = data.totalDocs;
        this.assignmentsNonRendus = this.assignmentsNonRendus.concat(data.docs);
      });
  }
  initScrollRendus(){
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
  }
  initScrollNonRendus(){
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
  ngAfterViewInit() {
    this.initScrollRendus();
    this.initScrollNonRendus();
  }

  drop($event: CdkDragDrop<any,any>) {
    if($event.item.data.rendu){
      console.log("rendus",$event.item.data);
      return;
    }
    this.rendre($event.item.data);
  }

  rendre(assignment: AssignmentModel) {
    console.log(assignment);
    const matdialog = this.matdialog.open<RendreModalComponent>(RendreModalComponent, {
      data: {assignment}
    });
    matdialog.afterClosed().subscribe(data => {
      if(data){
        const loader = this.messagingService.createSpinner();
        this.assignmentsService.rendre(data.id,data.note,data.description).subscribe(data => {
          loader.close();
          this.messagingService.openSnackBar('Le devoir a été rendu',3000);
          this.refreshData();
        }, error => {
          loader.close();
          this.messagingService.openSnackBar(error.data.message,3000);
        });
      }
    });
  }

  dropNonRendu($event: CdkDragDrop<any, any>) {
    if(!$event.item.data.rendu){
      console.log("non rendus",$event.item.data);
      return;
    }
    const loader = this.messagingService.createSpinner();
    this.assignmentsService.annulerRendre($event.item.data._id).subscribe(data => {
      loader.close();
      this.dashboardService.reloadCounts();
      this.messagingService.openSnackBar('Le rendu du devoir a été annulé',3000);
      this.refreshData();
    }, error => {
      loader.close();
      this.messagingService.openSnackBar(error.data.message,3000);
    });
  }

  remove(matiere: Matiere): void {
    const index = this.selectedMatieres.indexOf(matiere);
    if (index >= 0) {
      this.selectedMatieres.splice(index, 1);
    }
  }
  selected($event: MatAutocompleteSelectedEvent) {
    console.log($event.option);
    this.selectedMatieres.push(this.matieres.filter(value => value._id === $event.option.value)[0]);
    this.input.nativeElement.value = '';
    this.matiere_control.setValue(null);
  }

  add($event: MatChipInputEvent) {
    const input = $event.input;
    const value = $event.value;
    if ((value || '').trim()) {
      console.log(value);
      const data = this.matieres.filter(val => val._id === value)[0];
      this.selectedMatieres.push(data);
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
    this.matiere_control.setValue(null);
  }
  private _filter(value: string): Matiere[] {
    const filterValue = value.toLowerCase();
    const data = this.getDiffBetweenTabs()
      .filter(matiere => matiere.nomMatiere.toLowerCase()
      .indexOf(filterValue) === 0);
    return data;
  }

  search() {}
}
