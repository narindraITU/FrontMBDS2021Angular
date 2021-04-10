import { Component, OnInit } from '@angular/core';
import {DashboardService} from "../../shared/HttpServices/dashboard.service";
import {MessagingService} from "../../shared/Others/messaging.service";
import {DashboardKeyValueModel} from "../models/DashboardKeyValue.model";
import * as moment from "moment";


type oneData = {isLoading: boolean,xAxisLabel: string,yAxisLabel: string,
  data: any[]};


@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  currentCounts: any = null;
  dataAssignments: {days: oneData} = {days: {
      isLoading: false,
      xAxisLabel: 'Date de rendu',
      yAxisLabel: 'Devoirs',
      data: [],
  }};
  dataMatieres: {days: oneData} = {days: {
      isLoading: false,
      xAxisLabel: 'Date de création',
      yAxisLabel: 'Nombre',
      data: [],
  }};
  dataEleves: {days: oneData} = {days: {
      isLoading: false,
      xAxisLabel: 'Date de création',
      yAxisLabel: 'Nombre',
      data: [],
  }};
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA','cyan','blue','cornflowerblue']
  };
  per_day_data = {
    showXAxis: true,
    showYAxis: true,
    gradient: false,
    showLegend: true,
    legend: true,
    timeline: true,
    showXAxisLabel: true,
    showYAxisLabel: true,
  };

  constructor(private dashboardService: DashboardService,
              private messagingService: MessagingService) { }

  formatSeries(tableau: any[]): any[]{
    const tableau_sort =  tableau.sort((a,b) => {
      const date_a = moment(a.name,'dd-MM-YYYY');
      const date_b = moment(b.name,'dd-MM-YYYY');
      return date_a.unix() - date_b.unix();
    });
    return tableau_sort;
  }
  loadAssignmentsData(){
    this.dataAssignments.days.isLoading = true;
    this.dashboardService.statsAssignments().subscribe(data => {
      const series = [];
      series.push({
        name: "Devoirs",
        series: this.formatSeries(data.stat_days.map(value => ({
          name: value._id.dateCreated,
          value: value.count,
        })))
      });
      series.push({
        name: "Devoirs rendus",
        series: this.formatSeries(data.stat_days_rendu.map(value => ({
          name: value._id.dateCreated,
          value: value.count,
        })))
      });
      series.push({
        name: "Devoirs pas rendus",
        series: this.formatSeries(data.stat_days_nonrendu.map(value => ({
          name: value._id.dateCreated,
          value: value.count,
        })))
      });

      // data assignments
      this.dataAssignments.days.data = series;


      // data matieres
      const series_matieres = [];
      series_matieres.push({
        name: "Matières",
        series: this.formatSeries(data.matieres_par_jour.map(value => ({
          name: value._id.dateCreated,
          value: value.count,
        })))
      });
      this.dataMatieres.days.data = series_matieres;

      // data eleves
      const series_eleves = [];
      series_eleves.push({
        name: "Elèves",
        series: this.formatSeries(data.eleves_par_jour.map(value => ({
          name: value._id.dateCreated,
          value: value.count,
        })))
      });
      this.dataEleves.days.data = series_eleves;
      this.dataAssignments.days.isLoading = false;
    }, error => {
      console.log(error);
      this.dataAssignments.days.isLoading = false;
      this.messagingService.openSnackBar("Le nombre de devoirs créés par jour n'a pas pu être affiché",3000);
    });
  }
  ngOnInit(): void {
    this.dashboardService.getCounts().subscribe(data => {
      this.currentCounts = data;
    }, error => {
      console.log(error);
    });
    this.loadAssignmentsData();
  }
   dateTickFormatting(val: any): Date {
      return moment(val,"YYYY-MM-dd").toDate();
    }
}
