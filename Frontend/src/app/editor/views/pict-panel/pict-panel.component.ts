import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ReportResultHeader, ReportGraphHeader } from '../../headers/article';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-pict-panel',
  templateUrl: './pict-panel.component.html',
  styleUrls: ['./pict-panel.component.less']
})
export class PictPanelComponent implements OnInit, OnChanges {

  @Input() ret: any;
  previewImage = '';
  previewVisible = false;

  // public picUrl = 'http://139.199.13.162:8080/api/editor/graph/';
  public picUrl = 'https://api-us.biohub.tech/api/editor/graph/';

  constructor(public http: HttpClient,
              private msg: NzMessageService,
              public notice: NzNotificationService,
    ) { }

  fileList = [
    {
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    }
  ];

  ngOnInit() {
  }

  ngOnChanges() {
  }

  handlePreview = (pict: any) => {
    console.log(pict);
    this.previewImage = pict.url;
    this.previewVisible = true;
  }

  public picHttpMethod = (item) => {
    const httpOptions = {
      // headers: new HttpHeaders({
      //   'Content-Type':  'application/json'
      // }),
      withCredentials: true
    };
    item.withCredentials = true;
    console.log(item);

    const formData: FormData = new FormData();
    formData.append('file', item.file, item.file.name);

    return this.http.post(this.picUrl, formData, httpOptions).subscribe(
      ctx => { const picNew = {};
              picNew['uid'] = ctx['pk'];
              picNew['name'] = ctx['name'];
              picNew['url'] = 'https://api-us.biohub.tech' + ctx['graph'];
              picNew['status'] = 'done';
              this.ret.pic.splice(this.ret.pic.length - 1, 1);
              this.ret.pic = [...this.ret.pic, picNew]; },
      error => {
          const picNew = {};
          picNew['uid'] = 'failed';
          picNew['name'] = item.file.name;
          picNew['url'] = 'assets/img/editor/ico/A.ico';
          picNew['status'] = 'error';
          this.ret.pic.splice(this.ret.pic.length - 1, 1);
          this.ret.pic = [...this.ret.pic, picNew];
          if (error.status === 413) {
            this.notice.blank('Upload Graph Failed', 'The picture is too large.');
          } else if (error.status === 403) {
            this.notice.blank('Upload Graph Failed', 'Please login in.');
          } else {
            this.notice.blank('Upload Graph Failed', 'Backend Failed.');
          }
      }
    );
  }

}
