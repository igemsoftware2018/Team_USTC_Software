import { Route } from '@angular/router';
import { UserinfoComponent } from './watch-info/userinfo.component';
import {DetailinfoComponent} from './watch-info/detailinfo/detailinfo.component';
import {DetailinfoBylabelComponent} from './watch-info/detailinfo-bylabel/detailinfo-bylabel.component';
import {DetailinfoByarchiveComponent} from './watch-info/detailinfo-byarchive/detailinfo-byarchive.component';

export const userinfo_route: Route = {
  path: 'detailinfo', component: UserinfoComponent,
  children: [
    { path: '', redirectTo: 'index'} ,
    { path: 'index', component: DetailinfoComponent},
    { path: 'label/:label_id', component: DetailinfoBylabelComponent, },
    { path: 'archive/:archive_id', component: DetailinfoByarchiveComponent},
    ]
};
