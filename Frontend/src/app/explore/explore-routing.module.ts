import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { PopularReportComponent } from './popular-report/popular-report.component';
import { PopularIgemersComponent } from './popular-igemers/popular-igemers.component';

const routes: Routes = [
  { path: '', component: IndexComponent,
  children: [
    { path: 'reports', component: PopularReportComponent},
    { path: 'users', component: PopularIgemersComponent},
    { path: '', redirectTo: '/explore/reports'}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExploreRoutingModule { }
