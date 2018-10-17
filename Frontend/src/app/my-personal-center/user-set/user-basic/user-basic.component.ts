import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { Validators, FormBuilder } from '@angular/forms';
import { HttpService } from '../../../http.service';
import {ApiResult} from '../../../Interface/ApiResult';
import {UserSigninfoService} from '../../../user-signinfo.service';

@Component({
  selector: 'app-user-basic',
  templateUrl: './user-basic.component.html',
  styleUrls: ['./user-basic.component.less']
})
export class UserBasicComponent implements OnInit {
  loading = false;
  viewImage = '//zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png';

  issaved = false;
  usermes = this.fb.group({
    photo: [this.sim.myInfo.avatar_url],
    actualname: [this.sim.myInfo.actual_name, [ Validators.required,
      Validators.minLength(4)
    ]],
    description: [this.sim.myInfo.description, [ Validators.maxLength(200)]],
    location: [this.sim.myInfo.location],
    organization: [this.sim.myInfo.organization],
    email: [this.sim.myInfo.email, [Validators.email]],
  });
  personalmes = {
    photo: '',
    actualname: '',
    description: '',
    location: '',
    organization: '',
    email: '',
  };

  beforeUpload = (file: File) => {
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      this.message.error('Image must smaller than 2MB!');
    }
    return isLt2M;
  }

  private getBase64(img: File, callback: (img: {}) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  handleChange(info: { file: UploadFile }): void {
    if (info.file.status === 'uploading') {
      this.loading = true;
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, (img: string) => {
        this.loading = false;
        this.viewImage = img;
      });
    }
  }

  onSave() {
    this.issaved = true;
    this.http.update_profile( this.usermes.value.photo || '' ,
                              this.usermes.value.actualname || '',
                              this.usermes.value.location || '',
                              this.usermes.value.description || '',
                              this.usermes.value.organization || '',
                              this.usermes.value.email || '',
                              this.callback);
  }
  callback = (result: ApiResult) => {
    console.log(result);
    if (result.success) {
      this.message.success('Update sucessfully');
      this.http.get_myself( ret => {
        this.sim.setUserInfobyInfo(ret.success, ret.data);
      });
    } else {
      this.message.error('Fail to Update.' + result.data.detail);
    }
  }

  constructor(private fb: FormBuilder,
              private message: NzMessageService,
              private http: HttpService,
              public sim: UserSigninfoService,
              public httpclient: HttpClient ) { }

  ngOnInit() {
  }

  public picHttpMethod = (item) => {

    const httpOptions = {
      withCredentials: true
    };

    const picUrl = 'https://api-us.biohub.tech/api/users/upload_avatar/';

    const formData: FormData = new FormData();
    formData.append('file', item.file, item.file.name);

    return this.httpclient.post( picUrl, formData, httpOptions).subscribe(
      ctx => { const new_url = ctx;
        console.log(ctx);
        this.http.get_myself( ret => {
          this.sim.setUserInfobyInfo(ret.success, ret.data); }); },

      error => { this.message.error('Upload Graph Failed'); }
    );
  }

}
