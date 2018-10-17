import {Report, Simuser} from '../../Interface/userinfo';

export class LikeNotification {
  kind: string;
  date: string;
  friend: Simuser;
  report: Report;
}
export class FollowNotification {
  kind: string;
  date: string;
  friend: Simuser;
}
