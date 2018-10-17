import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePageComponent } from './display-container/profile-page/profile-page.component';
import { WatchReportLabelComponent } from './display-container/watch-report-label/watch-report-label.component';
import { DisplayAllInfoComponent } from './display-container/watch-all-info/display-all-info.component';
import { WatchReportArchiveComponent } from './display-container/watch-report-archive/watch-report-archive.component';

const routes: Routes = [
  {
    path: '',
    component: ProfilePageComponent,
    children: [{
      path: '',
      redirectTo: 'index',
      pathMatch: 'full'
    },
      {
        path: 'index',
        component: DisplayAllInfoComponent,
      },
      {
        path: 'label/:label_id',
        component: WatchReportLabelComponent,
      },
      {
        path: 'archive/:archive_id',
        component: WatchReportArchiveComponent,
      }]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OthersPersonalCenterRoutingModule { }
