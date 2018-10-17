import {Component, Input, OnInit} from '@angular/core';
import {Simuser, Assortment, Label, Archive, Report} from '../../../Interface/userinfo';
import {ApiResult} from '../../../Interface/ApiResult';
import {LiteralArray} from '@angular/compiler';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.less']
})
export class PersonalInformationComponent implements OnInit {
  @Input() userinfo: Simuser;  // 这是左上角的simuser数据
  @Input() labels: Label[];
  @Input() archive: Archive[];
  @Input() popular_reports: Report[] = [];
  /* for pending */
  @Input() pending_show: boolean;
  @Input() pending_wrong_show: boolean;
  /* for pending */
  constructor() { }

  ngOnInit() {
  }

}
