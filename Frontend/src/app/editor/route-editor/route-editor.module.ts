import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from '../views/main/main.component';


const routes: Routes = [
  {path: '', redirectTo: '0', pathMatch: 'full'},
  {path: 'test', redirectTo: '16', pathMatch: 'full'},
  {path: ':id', component: MainComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RouteEditorModule { }
