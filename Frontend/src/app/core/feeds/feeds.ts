import {Report, Simuser} from '../../Interface/userinfo';

export class LikeFeed {
  kind: string;
  date: string;
  friend: Simuser;
  report: Report;
}
export class FollowFeed {
  kind: string;
  date: string;
  friend: Simuser;
  otheruser: Simuser;
}
export class UploadFeed {
  kind: string;
  date: string;
  report: Report;
}

