import {Component, OnInit, ViewChild} from '@angular/core';
import {ImagePickerConf, NgpImagePickerComponent} from "ngp-image-picker";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ProgressComponent} from "../../BaseComponents/Progress/ProgressComponent";
import {MatieresService} from "../../shared/HttpServices/matieres.service";
import {HttpEventType} from "@angular/common/http";
import {MessagingService} from "../../shared/Others/messaging.service";
import {Matiere} from "../matiere.model";
import {DashboardService} from "../../shared/HttpServices/dashboard.service";
<<<<<<< HEAD
import {PageEvent} from "@angular/material/paginator";
=======
import {AuthService} from "../../shared/HttpServices/auth.service";
>>>>>>> origin/Feat/M/Matiere_Chargement_Eleves

@Component({
  selector: 'app-liste-matiere',
  templateUrl: './liste-matiere.component.html',
  styleUrls: ['./liste-matiere.component.scss']
})
export class ListeMatiereComponent implements OnInit {
  imagePickerConf: ImagePickerConf = {
    borderRadius: "4px",
    language: "fr",
    width: "320px",
    height: "240px",
  };
  page: number = 1;
  liste: Matiere[] = [];
  totalDocs: number = 0;
  @ViewChild('imagepicker', {static: false}) imagepicker: NgpImagePickerComponent;
  formulaire: FormGroup = new FormGroup({
    nomProf: new FormControl('',Validators.required),
    nomMatiere: new FormControl('',Validators.required),
    icone: new FormControl('warning',Validators.required),
    image: new FormControl(null,Validators.required),
  });
  constructor(private matDialog: MatDialog,
              private authService: AuthService,
              private matieresService: MatieresService,
              private dashboardService: DashboardService,
              private messagingService: MessagingService) { }

  loadData(){
    const spinner = this.messagingService.createSpinner();
    this.matieresService.load(this.page).subscribe(data => {
        this.liste = data.docs;
        this.totalDocs = data.totalDocs;
        spinner.close();
    }, error => {
      this.messagingService.openSnackBar("Une erreur est survenue au niveau du serveur", 1500);
      spinner.close();
    });
  }
  ngOnInit(): void {
    this.loadData();
  }
  valid(){
    return this.formulaire.valid;
  }
  onImageChange($event: string) {
    this.formulaire.controls.image.setValue($event ? $event : null);
  }

  onIconPickerSelect($event: string) {
    this.formulaire.controls.icone.setValue($event ? $event : null);
  }

  reset() {
      this.formulaire.reset();
      this.imagepicker.imageSrc = null;
      this.imagepicker.loadImage =false;
      this.imagepicker.lastOriginSrc = null;
  }

  submit() {
    const progress = this.matDialog.open(ProgressComponent, {
      width: '500px',
      height: '150px',
      data: {progress: 0}
    });
    this.matieresService.create({
      image: this.formulaire.controls.image.value,
      profName: this.formulaire.controls.nomProf.value,
      matiere: this.formulaire.controls.nomMatiere.value,
      icone: this.formulaire.controls.icone.value,
    }).subscribe(event => {
        if(event.type === HttpEventType.UploadProgress){
          progress.componentInstance.data.progress = Math.round(100 * event.loaded / event.total);
        }
        else if (event.type === HttpEventType.Response) {
          this.messagingService.openSnackBar("La nouvelle matière a été insérée"
            , 1500, 'Fermer');
          progress.close();
          this.loadData();
          this.dashboardService.reloadCounts();
          this.reset();
        }
      }, error => {
      progress.close();
      this.messagingService.openSnackBar('Une erreur est survenue'
        , 1500, 'Fermer');
      });
  }

  delete(id: string) {
    const spinner = this.messagingService.createSpinner();
    this.matieresService.delete(id).subscribe((data) => {
      this.messagingService.openSnackBar(data.message, 1500);
      spinner.close();
      this.loadData();
      this.dashboardService.reloadCounts();
    }, error => {
      this.messagingService.openSnackBar("Une erreur est survenue au niveau du serveur", 1500);
      spinner.close();
    });
  }

  edit($event: string) {

  }

  updatePage($event: PageEvent) {
    console.log($event.pageIndex);
    this.page = $event.pageIndex + 1;
    this.loadData();
}
}
