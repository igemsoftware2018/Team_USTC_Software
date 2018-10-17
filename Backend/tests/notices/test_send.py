from rest_framework.test import APITestCase

from biohub.notices import tool
from biohub.accounts.models import User


class Test(APITestCase):

    def setUp(self):
        self.me = User.objects.create_test_user('me')
        self.you = User.objects.create_test_user('you')
        self.dispatcher = tool.Dispatcher('test')

    def test_basic_send(self):
        notice = self.dispatcher.send(
            self.me,
            'User {{user.username}} {{category}}')

        self.assertEqual(notice.message, 'User %s test' % self.me.username)
        self.assertEqual('test', notice.category)

    def test_url(self):
        notice = self.dispatcher.send(
            self.me,
            '{{"title"|url:user}}')

        self.assertEqual('[[title]]((user))((%s))' % self.me.username, notice.message)

    def test_group_send(self):
        notices = self.dispatcher.group_send(
            [self.me, self.you],
            '{{user.username}}')

        self.assertListEqual(['me', 'you'], [x.message for x in notices])
