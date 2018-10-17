import { user1, user2, user3, report1 } from '../../Interface/mock-user';

const LIKEFEED = {
  kind: 'like',
  date: '2 days ago',
  friend: user3,
  report: report1,
};
const FOLLOWFEED = {
  kind: 'follow',
  date: '2 days ago',
  friend: user1,
  otheruser: user3,
};
const UPLOADFEED = {
  kind: 'upload',
  date: '2 days ago',
  report: report1,
};
export const FEEDS: any[] = [
    LIKEFEED,
    FOLLOWFEED,
    UPLOADFEED,
  ];
