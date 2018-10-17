import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReportshowComponent} from './reportshow/reportshow.component';
import {ReportshowotherComponent} from './reportshowother/reportshowother.component';

const routes: Routes = [
  {
    path: 'my/:report_id',
    component: ReportshowComponent
  },
  {
    path: 'others/:report_id',
    component: ReportshowotherComponent,
  },
  { path: '**', redirectTo: '/404', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportshowsRoutingModule { }
