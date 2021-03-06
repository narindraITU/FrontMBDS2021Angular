import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import {DashboardRoutingModule} from "./dashboard-routing.module";
import { DashboardCardComponent } from './dashboard-card/dashboard-card.component';
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {BarChartModule, LineChartModule, PieChartModule} from "@swimlane/ngx-charts";
import {MatCardModule} from "@angular/material/card";

@NgModule({
  declarations: [DashboardComponent, DashboardPageComponent, DashboardCardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatIconModule,
    MatProgressSpinnerModule,
    LineChartModule,
    BarChartModule,
    MatCardModule,
    PieChartModule,
  ],
  bootstrap: [DashboardComponent]
})
export class DashboardModule { }
