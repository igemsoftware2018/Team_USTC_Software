import hashlib

from django.db import models
from django.utils.functional import cached_property
from django.core.validators import MaxLengthValidator

from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.core.files.storage import default_storage

from biohub.accounts.user_defined_signals import follow_user_signal, unfollow_user_signal
from biohub.accounts.validators import UsernameValidator
from biohub.core.files.utils import url_to_filename

AVATAR_URL_BASE = 'https://www.gravatar.com/avatar/{md5}?s=328&r=g&d=identicon'


class UserManager(BaseUserManager):

    use_in_migrations = True

    def create_test_user(self, username, **extra_fields):

        if not username:
            raise ValueError('The given username must be set')

        user = self.model(username=username, email=username + '@example.com', **extra_fields)
        user.set_password(self.model._test_password)
        user.save(using=self._db)

        return user

    def create_user(self, username, password, email=None, **extra_fields):
        """
        Creates and saves a User with the given username, email and password.
        """
        if not username:
            raise ValueError('The given username must be set')
        email = self.normalize_email(email)
        username = self.model.normalize_username(username)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    create_superuser = create_user


class User(AbstractBaseUser):

    _test_password = '12345ab'

    username = models.CharField(
        'username',
        max_length=20,
        unique=True,
        validators=[UsernameValidator()],
        error_messages={
            'unique': ('A user with that username already exists.'),
        })
    actualname = models.CharField(
        'actualname',
        max_length=200,
        blank=True,
        validators=[MaxLengthValidator(200)])
    organization = models.CharField(
        'organization',
        max_length=200,
        blank=True,
        validators=[MaxLengthValidator(200)])
    email = models.EmailField('email address', unique=True)
    avatar_url = models.URLField('avatar url', blank=True)
    location = models.CharField(
        'location',
        max_length=200,
        blank=True,
        validators=[MaxLengthValidator(200)])
    site_url = models.URLField('personal site url', blank=True)
    description = models.TextField(
        'personal description', blank=True,
        validators=[MaxLengthValidator(1023)])

    followers = models.ManyToManyField(
        'self',
        symmetrical=False,
        related_name='following')

    USERNAME_FIELD = 'username'
    EMAIL_FIELD = 'email'

    REQUIRED_FIELDS = ['email']

    objects = UserManager()

    def get_full_name(self):
        "For compatibility."
        return self.username

    def __getattribute__(self, name):
        """
        Hacky approach to set default avatar url.
        """
        super_get = super(User, self).__getattribute__

        # Use super_get to avoid infinite recursion.
        if (name == 'avatar_url' and not super_get('avatar_url')):
            self.avatar_url = self.default_avatar_url
            return self.avatar_url

        return super(User, self).__getattribute__(name)

    @property
    def default_avatar_url(self):
        """
        Generates default avatar url using user's email.
        """
        return AVATAR_URL_BASE.format(
            md5=hashlib.md5(self.email.encode()).hexdigest())

    get_short_name = get_full_name

    @cached_property
    def api_url(self):
        from django.urls import reverse

        return reverse('api:accounts:user-detail', kwargs={'user_pk': self.id})

    def follow(self, target_user):
        """
        To follow a specific user.
        """

        if (target_user.id == self.id or
                target_user.followers.filter(pk=self.id).exists()):
            return

        target_user.followers.add(self)

        follow_user_signal.send(sender=self.__class__, instance=self, target_user=target_user)

    def unfollow(self, target_user):
        """
        To unfollow a specific user.
        """
        target_user.followers.remove(self)

        unfollow_user_signal.send(sender=self.__class__, instance=self, target_user=target_user)

    def update_avatar(self, url):
        old_name = url_to_filename(self.avatar_url)

        if old_name is not None:
            default_storage.delete(old_name)

        self.avatar_url = url
        self.save()

    def get_router_arguments(self):
        return 'user', self.username

    def get_stat(self):
        from biohub.biobrick.models import StarredUser
        from biohub.forum.models import Experience
        from biohub.editor.models import Report
        return {
            'follower_count': self.followers.count(),
            'following_count': User.followers.through.objects.filter(to_user_id=self.id).count(),
            'star_count': StarredUser.objects.filter(user=self).count(),
            'experience_count': Experience.objects.filter(author=self).count(),
            'report_count': Report.objects.filter(author=self).count()
        }
