import { NgModule } from '@angular/core';
import {Routes, RouterModule, Route} from '@angular/router';
import {AuthGuard} from './shared/Guards/auth.guard';
import {AuthModuleGuard} from "./auth/auth-module.guard";

const routes: Route[] = [
{
    path: '',
    pathMatch: 'full',
    redirectTo: 'main',
},
{
    path: 'auth',
    canLoad: [AuthModuleGuard],
    loadChildren: () => import('./auth/auth.module').then(data => data.AuthModule),
},
{
    path: 'main',
    canLoad: [AuthGuard],
    loadChildren: () => import('./assigments/assignments.module').then(data => data.AssignmentsModule),
},
{
    path: 'eleves',
    canLoad: [AuthGuard],
    loadChildren: () => import('./Eleves/eleves.module').then(data => data.ElevesModule),
},
{
    path: 'matieres',
    canLoad: [AuthGuard],
    loadChildren: () => import('./Matieres/matieres.module').then(data => data.MatieresModule),
},{
    path: 'dashboard',
    canLoad: [AuthGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then(data => data.DashboardModule),
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
