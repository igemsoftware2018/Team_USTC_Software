import { Component, OnInit } from '@angular/core';
import { FEEDS } from './mock-feeds';
import { LikeFeed, UploadFeed, FollowFeed } from './feeds';
import {HttpService} from '../../http.service';
import {ApiResult} from '../../Interface/ApiResult';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.less']
})
export class FeedsComponent implements OnInit {
  feeds: any[];
  constructor(
    private http: HttpService
  ) { }

  ngOnInit( ) {
    this.get_feeds();
  }
  get_feeds() {
    const callback = (result: ApiResult) => {
      if (result.success) {
        console.log(result.data.results);
        this.feeds = result.data.results;
      }
    };
    this.http.get_all_my_feeds(callback);
  }

}
