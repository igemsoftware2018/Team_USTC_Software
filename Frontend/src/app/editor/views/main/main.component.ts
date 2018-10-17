import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NzNotificationService } from 'ng-zorro-antd';
import { EditorReportService } from '../../core/editorReport.service';
import { UserSigninfoService } from '../../../user-signinfo.service';
import {StepsService} from '../../core/steps.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {

  editorHeight: string; // 判断高度
  innerWidth: number; // 屏幕宽度；

  id = +this.route.snapshot.paramMap.get('id');

  constructor(public editorReportService: EditorReportService,
              public notice: NzNotificationService,
              public route: ActivatedRoute,
              public router: Router,
              public stepsService: StepsService,
              public user: UserSigninfoService) { }

  ngOnInit() {
    this.onResize();
    if ( !this.user.isLogin) {
      this.notice.blank('Redirect to login page.', 'Please login first.');
      this.router.navigate(['authentication', 'signin']);
    }
    this.stepsService.mockData();
    if (typeof this.id === 'undefined' || this.id === 0) {
      this.editorReportService.initReport();
    } else {
      this.editorReportService.loadReport(this.id);
    }
  }

  public onResize() {
    this.editorHeight = (window.innerHeight - 46) + 'px';
    this.innerWidth = window.innerWidth;
  }

}
