import { User, Report } from '../Interface/userinfo';

export class Data {
  type: string;
  rank: number;
  data: any[];
}
class Time {
  end: string;
  start: string;
}
export class Filter {
  type: string;
  rel: string;
  value: string;
}
export class SearchResult {
  filters: Filter[];
  data: Data[];
}
export class DB {
  count: number;
  title: string;
  url: string;
}
