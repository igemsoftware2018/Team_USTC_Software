import { Component, OnInit } from '@angular/core';
import { Simuser } from '../../Interface/userinfo';
import {user1, user2, user3 } from '../../Interface/mock-user';
import {HttpService} from '../../http.service';
import {ApiResult} from '../../Interface/ApiResult';

@Component({
  selector: 'app-popular-igemers',
  templateUrl: './popular-igemers.component.html',
  styleUrls: ['./popular-igemers.component.less']
})
export class PopularIgemersComponent implements OnInit {
  igemers: Simuser[];
  /* for pending */
  count: number;
  pending_show: boolean;
  pending_wrong_show: boolean;
  /* for pending */
  constructor(
    private http: HttpService,
  ) { }

  ngOnInit() {
    this.count = 0;
    this.pending_show = true;
    this.pending_wrong_show = false;
    this.get_popular_iemers();
  }
  get_popular_iemers  = () => {
    const callback = (result: ApiResult) => {
     if (result.success) {
       this.igemers = result.data.results;
       /* for pending */
       this.count++;
     } else {
       this.pending_wrong_show = true;
     }
      if(this.count === 1) {
        this.pending_show = false;
      }
     /* for pending */
    };
    this.http.get_active_users(callback);
  }
}
