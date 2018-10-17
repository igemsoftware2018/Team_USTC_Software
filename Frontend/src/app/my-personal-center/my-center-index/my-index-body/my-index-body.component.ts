import { Component, OnInit, Input} from '@angular/core';
import {Collection, Report} from '../../../Interface/userinfo';

@Component({
  selector: 'app-my-index-body',
  templateUrl: './my-index-body.component.html',
  styleUrls: ['./my-index-body.component.less']
})
export class MyIndexBodyComponent implements OnInit {
  @Input() collections: Collection[];
  @Input() favorite: Report[];
  /* for pending */
  @Input() pending_show: boolean;
  @Input() pending_wrong_show: boolean;
  /* for pending */
  constructor() { }

  ngOnInit() {
  }

}
