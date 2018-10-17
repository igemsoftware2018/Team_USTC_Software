import { Component, Input, OnInit } from '@angular/core';
import {Simuser} from '../../Interface/userinfo';
import {RouterjudgeService} from '../routerjudge.service';

@Component({
  selector: 'app-siminfo',
  templateUrl: './siminfo.component.html',
  styleUrls: ['./siminfo.component.less']
})
export class SiminfoComponent implements OnInit {
  @Input() user: Simuser;
  @Input() ifmyself: boolean;
  constructor(private routerjudge: RouterjudgeService) { }
  gotoIndex = () => {
    this.routerjudge.gotoUserIndex(this.user.id);
  }
  gotoDetailInfo = () => {
    this.routerjudge.gotoUserDetailInfo(this.user.id);
  }
  ngOnInit() {
  }

}
