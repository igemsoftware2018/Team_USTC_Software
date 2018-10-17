import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import { Simuser, Report } from '../../Interface/userinfo';
import {HttpService} from '../../http.service';
import {ApiResult} from '../../Interface/ApiResult';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {
  AbstractControl,
  FormBuilder, FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  forbiddenAlphaValidator,
  forbiddenNumericValidator,
  userAccountValidator
} from '../../my-personal-center/user-set/user-account/forbidden-useraccount';

@Component({
  selector: 'app-report-author-info',
  templateUrl: './report-author-info.component.html',
  styleUrls: ['./report-author-info.component.less']
})
export class ReportAuthorInfoComponent implements OnInit, OnChanges {
  @Input() user: Simuser;
  @Input() report: Report;
  @Input() isMyself: boolean;
  // 判断用户是否被follow
  old_follow_bl: boolean;
  old_follow_msg: string;
  btncontent: string;
  isFollow: boolean;
  // 判断报告是否被收藏或被点赞
  isliked: boolean;
  iscollected: boolean;
  old_liked_bl: boolean;
  // 点击开始改变状态收藏
  collecting: boolean;
  uncollecting: boolean;
  isOkLoading: boolean;
  collectForm: FormGroup;

  constructor(
    private http: HttpService,
    private message: NzMessageService,
    private modalService: NzModalService,
    private fb: FormBuilder
  ) { }
/*
  this.useraccount = new FormGroup({
    oldpassword: new FormControl(),
    newpassword: new FormControl('', [
      forbiddenAlphaValidator(),
      forbiddenNumericValidator(),
      Validators.minLength(7),
      Validators.maxLength(30),
    ]),
    confirmpassword: new FormControl('', [
      forbiddenAlphaValidator(),
      forbiddenNumericValidator(),
      Validators.minLength(7),
      Validators.maxLength(30),
    ])
  }, { validators: userAccountValidator });
}*/

  ngOnChanges(changes: SimpleChanges): void {
    console.log('change');
    console.log(this.user);
    console.log(this.report);
    console.log(this.isMyself);
    if (this.user !== undefined && this.report !== undefined && this.isMyself !== undefined) {
      this.isFollow = this.user.followed;
      this.isliked = this.report.isliked;
      this.iscollected = this.report.iscollected;
      this.btncontent = this.isFollow ? 'unfollow' : 'follow';
      /*
      this.collectForm = this.fb.group({
        collection: [ null, [ Validators.required, Validators.maxLength(20) ] ],
      });
      */
    }
  }
  ngOnInit() {
    console.log('init');
    console.log(this.user);
    console.log(this.report);
    console.log(this.isMyself);
    if (this.user !== undefined && this.report !== undefined && this.isMyself !== undefined) {
      this.isFollow = this.user.followed;
      this.isliked = this.report.isliked;
      this.iscollected = this.report.iscollected;
      this.btncontent = this.isFollow ? 'unfollow' : 'follow';
      /*
      this.collectForm = this.fb.group({
        collection: [ null, [ Validators.required, Validators.maxLength(20) ] ],
      });
      */
    }
    this.collectForm = new FormGroup({
      collection: new FormControl('', [
        Validators.required,
        Validators.maxLength(20)
      ])
    });
  }
  // 回调函数定义
  follow_callback = (result: ApiResult) => {
    if (!result.success) {
      this.message.error( 'Fail to unfollow' + this.user.username);
      this.isFollow = this.old_follow_bl;
      this.btncontent = this.old_follow_msg;
    }
  }
  unfollow_callback = (result: ApiResult) => {
    if (!result.success) {
      this.message.error( 'Fail to follow' + this.user.username);
      this.isFollow = this.old_follow_bl;
      this.btncontent = this.old_follow_msg;
    }
  }
  toggleFollow = () => {
    // 点击先直接修改
    this.old_follow_bl = this.isFollow;
    this.old_follow_msg = this.btncontent;
    this.isFollow = !this.old_follow_bl;
    this.btncontent = this.old_follow_bl ? 'follow' : 'unfollow';
    // 根据现在是否关注进行请求
    if (!this.old_follow_bl) {
      this.http.follow_user_by_id(this.user.id, this.follow_callback);
    } else {
      this.http.unfollow_user_by_id(this.user.id, this.unfollow_callback);
    }
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
  submitForm = () => {
    for (const i in this.collectForm.controls) {
      if (i in this.collectForm.controls) {
        this.collectForm.controls[ i ].markAsDirty();
        this.collectForm.controls[ i ].updateValueAndValidity();
      }
    }
  }
  /*
  get collection() {
    return this.collectForm.get('collection');
  }*/
}
