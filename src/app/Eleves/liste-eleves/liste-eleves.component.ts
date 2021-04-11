import {Component, NgZone, OnInit} from '@angular/core';
import {ElevesService} from "../../shared/HttpServices/eleves.service";
import {MessagingService} from "../../shared/Others/messaging.service";
import {Eleves} from "../eleves.model";
import {MatDialog} from "@angular/material/dialog";
import {EditEleveComponent} from "../edit-eleve/edit-eleve.component";
import {PageEvent} from "@angular/material/paginator";
import {DashboardService} from "../../shared/HttpServices/dashboard.service";

@Component({
  selector: 'app-liste-eleves',
  templateUrl: './liste-eleves.component.html',
  styleUrls: ['./liste-eleves.component.scss']
})
export class ListeElevesComponent implements OnInit {
  nom: string = '';
  prenom: string = '';
  liste: Eleves[] = [];
  page: number = 1;
  totalDocs: number = 0;
  current_date = new Date();
  constructor(private elevesServices: ElevesService,
              private readonly ngZone: NgZone,
              private matdialog: MatDialog,
              private dashboardService: DashboardService,
              private messagingService: MessagingService) { }

  ngOnInit(): void {
    this.loadData();
  }
  getDate(texte: string){
    return new Date(texte);
  }
  loadData(){
    const spinner = this.messagingService.createSpinner();
    this.elevesServices.loadData(this.page).subscribe((data) => {
      console.log(data);
      this.liste = data.docs;
      this.totalDocs = data.totalDocs;
      spinner.close();
    }, error => {
      this.messagingService.openSnackBar("Une erreur est survenue au niveau du serveur", 1500);
      spinner.close();
    });
  }
  createUser(){
      const spinner = this.messagingService.createSpinner();
      this.elevesServices.createEleve({nom: this.nom, prenom: this.prenom}).subscribe((data) => {
        this.messagingService.openSnackBar("Un nouvel élève a été créé", 1500);
        this.dashboardService.reloadCounts();
        spinner.close();
        this.nom = "";
        this.prenom = "";
        this.loadData();
      }, error => {
        this.messagingService.openSnackBar("Une erreur est survenue au niveau du serveur", 1500);
        spinner.close();
      });
  }
  delete(id: string){
    const spinner = this.messagingService.createSpinner();
    this.elevesServices.delete(id).subscribe((data) => {
      this.messagingService.openSnackBar(data.message, 1500);
      spinner.close();
      this.loadData();
    }, error => {
      this.messagingService.openSnackBar("Une erreur est survenue au niveau du serveur", 1500);
      spinner.close();
    });
  }

  edit(eleve: Eleves) {
      const dialog = this.matdialog.open(EditEleveComponent, {
        data: {
          eleve
        },
        width: '600px',
      });
      dialog.afterClosed().subscribe(data => {
        if(data && data.submit){
          const spinner = this.messagingService.createSpinner();
          this.elevesServices
            .update(eleve._id,{nom: data.nom, prenom: data.prenom})
            .subscribe(data => {
              spinner.close();
              this.messagingService.openSnackBar(data.message, 1500);
              this.loadData();
            }, error => {
              this.messagingService.openSnackBar("Une erreur est survenue au niveau du serveur", 1500);
              spinner.close();
            });
        }
      });
  }

  paginatorChanged($event: Event) {

  }

  updatePage($event: PageEvent) {
      console.log($event.pageIndex);
      this.page = $event.pageIndex + 1;
      this.loadData();
  }
}
