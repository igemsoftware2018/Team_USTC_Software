import { SearchResult } from './search-result';
import {user1, user2, report1} from '../Interface/mock-user';

export const RESULT = {
  filters: [
    {
      type: 'time',
      rel:  'gt',
      value: '2018-10-12'
    },
    {
      type: 'title',
      rel: 'like',
      value: 'some_title'
    },
    {
      type: 'author',
      rel: 'is',
      value: 'Jiyan'
    }
  ],
  data: [
    {
      type: 'user',
      rank: 1,
      data: [ user1, user2]
    },
    {
      type: 'report',
      rank: 2,
      data: [report1]
    },
    {
      type: 'biobrick',
      rank: 3,
      data: [
        '<B1>',
        '<B2>'
      ]
    },
    {
      type: 'db',
      rank: 4,
      data: [ report1]
    }
  ]
};
export const MOCKDB = [
{count: 0, title: 'iGEM Parts', url: 'http://parts.igem.org/Special:Search?search=p12'},
];
