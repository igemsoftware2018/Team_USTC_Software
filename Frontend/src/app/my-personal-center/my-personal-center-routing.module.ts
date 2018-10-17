import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { MyCenterIndexComponent} from './my-center-index/my-center-index.component';
import { userinfo_route } from './user-info/watch-info-routing';
import {userset_route } from './user-set/user-set-routing';

const routes: Routes = [
  { path: 'index', component: MyCenterIndexComponent},
  { path: '', redirectTo: 'index'},
  userset_route,
  userinfo_route,
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyPersonalCenterRoutingModule { }
