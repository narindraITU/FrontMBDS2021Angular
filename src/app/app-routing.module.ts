import { NgModule } from '@angular/core';
import {Routes, RouterModule, Route} from '@angular/router';
import {AuthGuard} from './shared/auth.guard';
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
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
