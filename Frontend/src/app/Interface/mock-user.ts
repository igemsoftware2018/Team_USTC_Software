import {User, Report, Assortment, ReportComment} from './userinfo';
import { Simuser } from './userinfo';

export const user1: Simuser = {
  id: 2,
  username: 'Sindy',
  actual_name: 'Cindy',
  description: 'about me',
  avatar_url: '//zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  stat: {
    following_count: 42,
    follower_count: 233,
    star_count: 1,
    experience_count: 1,
    report_count: 1,
  },
  location: 'China',
  email: 'biohub@mail.ustc.edu.cn',
  organization: 'USTC',
  followed: true,
};
export const user2: Simuser = {
  id: 3,
  username: 'Cindy',
  actual_name: 'Cindy',
  description: 'about me balabalabalabalabalabalabalabalabalabala',
  avatar_url: '//zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  stat: {
    following_count: 42,
    follower_count: 233,
    star_count: 1,
    experience_count: 1,
    report_count: 1,
  },
  location: 'China',
  email: 'biohub@mail.ustc.edu.cn',
  organization: 'USTC',
  followed: true,
};
export const user3: Simuser = {
  id: 4,
  username: 'Sindi',
  actual_name: 'Cindy',
  description: 'about me',
  avatar_url: 'assets/img/test/img.jpg',
  stat: {
    following_count: 42,
    follower_count: 233,
    star_count: 1,
    experience_count: 1,
    report_count: 1,
  },
  location: 'China',
  email: 'biohub@mail.ustc.edu.cn',
  organization: 'USTC',
  followed: true,
};
const user4: Simuser = {
  id: 5,
  username: 'Candy',
  description: 'about me',
  actual_name: 'Cindy',
  avatar_url: 'assets/img/test/img.jpg',
  stat: {
    following_count: 42,
    follower_count: 233,
    star_count: 1,
    experience_count: 1,
    report_count: 1,
  },
  location: 'China',
  email: 'biohub@mail.ustc.edu.cn',
  organization: 'USTC',
  followed: true,
};
const labels = [
  { id: 1, name: 'ccc', report_count: 10},
  { id: 2, name: 'ddd', report_count: 15},
  { id: 2, name: 'ddd', report_count: 15},
];
export const  report1: Report = {
  id: 1,
  title: 'research',
  author: user4,
  labels: labels,
  abstract: '1. Centifuge 1.5 mL bacterium solution at 11000 rpm, few sediment getted. Remove the supernatant. Repeat twice.\n' +
  '2. Add 250 μL Buﬀer P1, resuspend cells.\n' +
  '1. Centifuge 1.5 mL bacterium solution at 11000 rpm, few sediment getted. Remove the supernatant. Repeat twice.\n' +
  '2. Add 250 μL Buﬀer P1, resuspend cells.\n',
  commentsnum: 190,
  likesnum: 12,
};

const archives = [
  { id: 1, date: '2018-10-9', num: 12},
  { id: 2, date: '2018-10-10', num: 14},
];
const popular_repots = [
  {id: 1, title: 'aaa', praises: 12},
  {id: 2, title: 'bbb', praises: 13},
];

const assortment = {
  archives: archives,
  popular_reports: popular_repots,
  labels: labels,
};
export const USER: User = {
  id: 1,
  following: [ user1, user2],
  followers: [user3, user4, user1 ],
  likes: [{
    ouser: user1,
    report: report1,
  }],
  reports: [report1],
};
export const SIMUSER: Simuser = {
  id: 1,
  username: 'Thomas Romero',
  description: 'messages',
  actual_name: 'Cindy',
  avatar_url: '//zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  stat: {
    following_count: 42,
    follower_count: 233,
    star_count: 1,
    experience_count: 1,
    report_count: 1,
  },
  location: 'China',
  email: 'biohub@mail.ustc.edu.cn',
  organization: 'USTC',
  followed: true,
};
export const CLASSIFICATION: Assortment = assortment;

