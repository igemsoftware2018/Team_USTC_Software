import {  Route } from '@angular/router';
import {ReportAllComponent} from './report-all/report-all.component';
import {ReportDraftComponent} from './report-draft/report-draft.component';
import {UserReportComponent} from './user-report/user-report.component';
import {UserNavComponent} from './user-nav/user-nav.component';
import {UserBasicComponent} from './user-basic/user-basic.component';
import {UserAccountComponent} from './user-account/user-account.component';
import {UserVariableComponent} from './user-variable/user-variable.component';

export const userset_route: Route = {
  path: 'userset',
  component: UserNavComponent,
  children: [{
    path: '',
    redirectTo: 'user-basic',
    pathMatch: 'full',
  },
    {
      path: 'user-basic',
      component: UserBasicComponent
    },
    {
      path: 'user-account',
      component: UserAccountComponent
    },
    {
      path: 'user-variable',
      component: UserVariableComponent,
    },
    {
      path: 'user-watch-all-info',
      component: UserReportComponent,
      children: [{
        path: '',
        redirectTo: 'watch-all-info-all',
        pathMatch: 'full'
      },
        {
          path: 'watch-all-info-all',
          component: ReportAllComponent
        },
        {
          path: 'watch-all-info-draft',
          component: ReportDraftComponent
        }]
    }]
};
