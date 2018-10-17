export class Simuser {
  id: number;
  username: string;
  avatar_url: string;
  actual_name?: string;
  description?: string;
  location?: string;
  email?: string;
  organization?: string;
  followed?: boolean;
  site_url?: string;
  last_login?: string;
  stat?: Stat; // 头像框下方四个数据
}
export class Stat {
  following_count: number;
  follower_count: number;
  star_count: number;
  experience_count: number;
  report_count: number;
}
export class Report {
  id: number;
  title: String;
  author: Simuser;
  labels: Label[];
  abstract: String;
  commentsnum: Number;
  likesnum: Number;
  iscollected?: boolean;
  isliked?: boolean;
}
export class Like {
  ouser: Simuser;
  report: Report;
}
export class User {
  id: number;
  following?: Simuser[];
  followers?: Simuser[];
  likes?: Like[];
  reports?: Report[];
}
export class Archive {
  id: number;
  date: string;
  num: number;
  // reports: Array<Report>;
}

export class PopularReport {
  id: number;
  title: string;
  praises: number;
}

export class Label {
  id: number;
  name: string;
  report_count?: number;
  // reports: Array<Report>;
}

export class Assortment {
  archives: Archive[];
  popular_reports: PopularReport[];
  labels: Label[];
}
export class Collection {
  id: number;
  text: string;
  name: string;
  to_report: number;
  reports: Report[];
}
export class ReportComment {
  user: Simuser;
  time: string;
  text: string;
  to_report?: number;
  reply_to?: any;
}
export class Collect {
  report: Report;
  iscollected: boolean;
}
export class Notification {
  id: number;
  has_read: boolean;
  message: string;
  category: string;
  created: string;
  target: any;
}
