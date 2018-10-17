import {Component, OnInit} from '@angular/core';
import { Report, ReportComment } from '../../Interface/userinfo';
import { report1 } from '../../Interface/mock-user';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {UserSigninfoService} from '../../user-signinfo.service';
import {EventService} from '../../editor/report-render/event.service';
import {HttpService} from '../../http.service';
import {ApiResult} from '../../Interface/ApiResult';
import {NzMessageService} from 'ng-zorro-antd';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-reportshow',
  templateUrl: './reportshow.component.html',
  styleUrls: ['./reportshow.component.less']
})
export class ReportshowComponent implements OnInit {
  report_id: number;
  report: Report;
  report_comments: ReportComment[];
  isLogin: boolean;
  commentForm: FormGroup;
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
    this.report = new Report();
    this.getReportId();
    this.get_report_by_id();
    this.isLogin = this.userinfo.isLogin;
    this.getComments();
    this.commentForm = this.fb.group(
      {
        comment: [null, [Validators.required]],
      }
    );
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
        this.message.success('Successlly creat a comment');
        const theurl = this.router.url;
        this.router.navigateByUrl('/explore/reports').then(
          () => {this.router.navigateByUrl(theurl);
          });
      }
    };
    const commentFormValue = this.commentForm.value;
    this.http.create_comment(this.report_id, commentFormValue.comment, -1, callback);
  }
  // 报告操作
  downloadReport = () => {
    this.dowload_report.downloadEvent.emit(0);
  }
  deleteReport() {
    const callback = (result: ApiResult) => {
      if (result.success) {
        this.message.success('Success to delete the report.');
        this.router.navigateByUrl('/explore');
      } else {
        this.message.error('Fail to delete the report.');
      }
    };
    this.http.delete_report(this.report_id, callback);
  }
}
