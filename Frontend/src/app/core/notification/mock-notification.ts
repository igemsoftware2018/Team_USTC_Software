import { user1, user2, user3, report1 } from '../../Interface/mock-user';

const LIKENOTI = {
  kind: 'like',
  date: '2 days ago',
  friend: user3,
  report: report1,
};
const FOLLOWNOTI = {
  kind: 'follow',
  date: '2 days ago',
  friend: user3 ,
};
export const NOTIS: any[] = [
  LIKENOTI,
  FOLLOWNOTI,
];
