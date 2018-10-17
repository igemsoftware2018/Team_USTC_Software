from unittest import SkipTest
from django.contrib.auth import authenticate

from rest_framework.test import APITestCase

import logging
logger = logging.getLogger(__name__)


class Test(APITestCase):

    def test_throttle(self):
        raise SkipTest
        import time
        from biohub.core.conf import settings

        payload = {
            'username': 'user1',
            'email': '123@123.com',
            'password': 'passws1ord',
        }

        payload2 = {
            'username': 'user2',
            'email': '1234@123.com',
            'password': 'passws1ord',
        }

        settings.THROTTLE['register'] = 1
        self.assertEqual(self.client.post('/api/users/register/', payload).status_code, 200)
        self.client.get('/api/users/logout/')
        self.assertEqual(self.client.post('/api/users/register/', payload2).status_code, 429)
        time.sleep(1)
        self.assertEqual(self.client.post('/api/users/register/', payload2).status_code, 200)

        settings.THROTTLE['register'] = 0

    def _post_register(self, drops=None, **kwargs):
        payload = {
            'username': 'user1',
            'email': '123@123.com',
            'password': 'passws1ord',
        }

        if drops is not None:
            for key in drops:
                payload.pop(key, None)

        payload.update(kwargs)

        return self.client.post('/api/users/register/', payload)

    def test_password_fail(self):
        resp = self._post_register(password='123')

        self.assertIn('password', resp.data)

    def test_password_correct_set(self):
        self._post_register()

        self.assertIsNotNone(
            authenticate(username='user1', password='passws1ord'))

    def test_success(self):
        resp = self._post_register()

        self.assertEqual(resp.status_code, 200)

    def test_empty(self):
        resp = self._post_register(drops=['password'])

        self.assertEqual(resp.status_code, 400)
        self.assertIn(b'required', resp.content)

        resp = self._post_register(password='')

        self.assertEqual(resp.status_code, 400)
        self.assertIn(b'blank', resp.content)

    def test_email(self):
        resp = self._post_register(email='1')

        self.assertEqual(resp.status_code, 400)
        self.assertIn(b'valid email', resp.content)

    def test_duplicate(self):
        from biohub.accounts.models import User

        u = User.objects.create_test_user('user1')

        resp = self._post_register(email='123@12.com')

        self.assertEqual(resp.status_code, 400)
        self.assertIn(b'exists', resp.content)

        resp = self._post_register(username='user2', email=u.email)

        self.assertEqual(resp.status_code, 400)
        self.assertIn(b'exists', resp.content)

    def test_response(self):
        resp = self._post_register()

        self.assertDictContainsSubset({
            'username': 'user1',
            'email': '123@123.com',
        }, resp.data)

        self.assertIn('_auth_user_id', self.client.session)
        self.assertEqual(
            str(resp.data['id']),
            self.client.session['_auth_user_id'])

    def test_logined(self):
        from biohub.accounts.models import User
        self.client.force_authenticate(
            User.objects.create_test_user('user1'))

        resp = self._post_register()
        self.assertEqual(resp.status_code, 404)
