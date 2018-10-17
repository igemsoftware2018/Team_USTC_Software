import { Component, OnInit, AfterContentInit} from '@angular/core';
import { Simuser, Report, ReportComment } from '../../Interface/userinfo';
import { report1 } from '../../Interface/mock-user';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {UserSigninfoService} from '../../user-signinfo.service';
import {EventService} from '../../editor/report-render/event.service';
import {HttpService} from '../../http.service';
import {ApiResult} from '../../Interface/ApiResult';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-reportshowother',
  templateUrl: './reportshowother.component.html',
  styleUrls: ['./reportshowother.component.less']
})
export class ReportshowotherComponent implements OnInit, AfterContentInit {
  report_id: number;
  // report: Report = report1;
  report: Report;
  report_comments: ReportComment[];
  isLogin: boolean;
  commentForm: FormGroup;
  me: Simuser;
  get comment() {
    return this.commentForm.get('comment');
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userinfo: UserSigninfoService,
    private dowload_report: EventService,
    private http: HttpService,
    private message: NzMessageService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.me = this.userinfo.myInfo;
    this.report = new Report();
    this.getReportId();
    this.get_report_by_id();
    this.getComments();
    this.commentForm = this.fb.group(
      {
        comment: [null, [Validators.required]],
      }
    );
  }
  ngAfterContentInit() {
    this.isLogin = this.userinfo.isLogin;
  }
  getReportId = () => {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.report_id = +params.get('report_id');
    });
  }
  // 评论表单
  getComments = () => {
    const callback = (result: ApiResult) => {
      if (result.success) {
        this.report_comments = result.data;
      } else {
        this.message.error('Something wrong.');
      }
    };
    this.http.get_report_comment(this.report_id, callback);
  }
  get_report_by_id = () => {
    const callback = (result: ApiResult) => {
      if (result.success) {
        this.report = result.data;
      }
    };
    this.http.get_report_simple(this.report_id, callback);
  }
  submitForm = () => {
    for (const i in this.commentForm.controls) {
      if (i in this.commentForm.controls) {
        this.commentForm.controls[i].markAsDirty();
        this.commentForm.controls[i].updateValueAndValidity();
      }
    }
    const callback = (result: ApiResult) => {
      if (result.success) {
        this.message.success('Successlly post a comment');
        const theurl = this.router.url;
        this.router.navigateByUrl('/explore/reports').then(
          () => {this.router.navigateByUrl(theurl);
          });
      } else {
        this.message.error('Something Wrong');
      }
    };
    const commentFormValue = this.commentForm.value;
    this.http.create_comment(this.report_id, commentFormValue.comment, -1, callback);
  }
  // 报告操作
  downloadReport = () => {
    this.dowload_report.downloadEvent.emit(0);
  }
}
