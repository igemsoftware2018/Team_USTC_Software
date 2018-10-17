from django.db import models
from django.contrib.contenttypes.fields import GenericRelation

from biohub.accounts.models import User
from biohub.editor.models import Report


class Star(models.Model):
    starrer = models.ForeignKey(User)
    starred_report = models.ForeignKey(Report)
    created = models.DateTimeField(auto_now_add=True)
    notices = GenericRelation('notices.Notice', 'target_id', 'target_type', related_query_name='star')


class Collection(models.Model):
    name = models.CharField(max_length=125)
    collector = models.ForeignKey(User)
    reports = models.ManyToManyField(Report)

