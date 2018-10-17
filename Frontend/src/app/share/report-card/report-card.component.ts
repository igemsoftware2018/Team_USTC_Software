import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Collect, Report} from '../../Interface/userinfo';
import {RouterjudgeService} from '../routerjudge.service';
import {ApiResult} from '../../Interface/ApiResult';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {HttpService} from '../../http.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-report-card',
  templateUrl: './report-card.component.html',
  styleUrls: ['./report-card.component.less']
})
export class ReportCardComponent implements OnInit {
  @Input() report: Report;
  @Output() togglecollect = new EventEmitter<Collect>();
  iscollected: boolean;
  isliked: boolean;
  old_liked_bl: boolean;
  // collect form
  collecting: boolean;
  isOkLoading: boolean;
  collectForm: FormGroup;
  uncollecting: boolean;
  get collection() {
    return this.collectForm.get('collection');
  }
  constructor(
    private routerjudge: RouterjudgeService,
    private message: NzMessageService,
    private http: HttpService,
    private modalService: NzModalService,
    private fb: FormBuilder,
    ) { }

  ngOnInit() {
    this.iscollected = this.report.iscollected;
    this.isliked = this.report.isliked;
    this.collectForm = this.fb.group({
      collection: [ null, [ Validators.required, Validators.maxLength(20) ] ],
    });
  }
  gotoIndex = () => {
    this.routerjudge.gotoUserIndex(this.report.author.id);
  }
  gotoReport = () => {
    this.routerjudge.gotoReportDisplay(this.report.author.id, this.report.id);
  }
  // 点赞回调函数定义
  liked_callback = (result: ApiResult) => {
    if (!result.success) {
      this.message.error( 'Fail to unfollow' + this.report.title);
      this.isliked = this.old_liked_bl;
    }
  }
  unliked_callback = (result: ApiResult) => {
    if (!result.success) {
      this.message.error( 'Fail to like' + this.report.title);
      this.isliked = this.old_liked_bl;
    }
  }
  toggleLiked = () => {
    // 点击先直接修改
    this.old_liked_bl = this.isliked;
    this.isliked = !this.old_liked_bl;
    // 根据现在是否点赞进行请求
    if (!this.old_liked_bl) {
      this.http.star(this.report.id, this.liked_callback);
    } else {
      this.http.unstar(this.report.id, this.unliked_callback);
    }
  }
  // 收藏函数
  showCollect = () => {
    if ( !this.iscollected ) {
      this.collecting = true;
    } else {
      this.modalService.confirm({
        nzTitle: 'Uncollect ' + this.report.title,
        nzContent: 'Are you sure to cancel your collection',
        nzOkText: 'OK',
        nzCancelText: 'Cancel',
        nzVisible: this.uncollecting,
        nzOkLoading: this.isOkLoading,
        nzOnOk: () => {
          const callback = (result: ApiResult) => {
            if (result.success) {
              // this.isOkLoading = true;
              this.message.success('Successly uncollect the report.');
              this.iscollected = !this.iscollected;
            } else {
              this.message.error( 'Fail to collect the report');
            }
            this.uncollecting = false;
            this.isOkLoading = false;
          };
          this.isOkLoading = true;
          this.http.remove_from_collection(this.report.id, callback);
        },
        nzOnCancel: () => {
          this.uncollecting = false;
        },
      });
    }
  }
  collectReport() {
    const collectinfo = this.collectForm.value;
    const callback = (result: ApiResult) => {
      if (result.success) {
        this.message.success('Successly collect the report.');
        this.iscollected = !this.iscollected;
      } else {
        this.message.error( 'Fail to collect the report');
      }
      this.isOkLoading = false;
      this.collecting = false;
    };
    this.isOkLoading = true;
    this.http.add_to_collection(this.report.id , collectinfo.collection, callback);
  }
  notShow() {
    this.collecting = false;
  }
  submitForm(): void {
    for (const i in this.collectForm.controls) {
      this.collectForm.controls[ i ].markAsDirty();
      this.collectForm.controls[ i ].updateValueAndValidity();
    }
  }
}
