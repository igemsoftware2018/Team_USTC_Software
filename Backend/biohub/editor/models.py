from django.utils.timezone import datetime
from django.db import models
from django.db.models import F, Count
from django.conf import settings
from django.contrib.contenttypes.fields import GenericRelation
from biohub.accounts.models import User


class UserVariable(models.Model):
    user = models.OneToOneField(User)
    variables = models.TextField(null=True)


class Report(models.Model):

    title = models.CharField(max_length=256)
    author = models.ForeignKey(User)
    introduction = models.TextField()
    label = models.ManyToManyField('Label', related_name='reports_related')
    ntime = models.DateTimeField(auto_now_add=True)
    mtime = models.DateTimeField(auto_now=True)
    result = models.TextField()       # json
    subroutines = models.TextField()  # json
    envs = models.TextField(null=True)         # json

    views = models.IntegerField(default=0)
    archive = models.ForeignKey('Archive', related_name='reports')

    notices = GenericRelation('notices.Notice', 'target_id', 'target_type', related_query_name='report')

    # See comments in Comment model!
    # See praises(likes in the doc) in User model

    def __str__(self):
        return 'id:{}, title:{}'.format(self.pk, self.title)

    def get_router_arguments(self):
        return 'report', self.pk

    def save(self, *args, **kwargs):
        d = datetime(year=self.ntime.year, month=self.ntime.month, day=1)
        archive, _ = Archive.objects.get_or_create(user=self.author, date=d)
        self.archive = archive
        super().save(*args, **kwargs)

    def viewed(self):
        self.views = F('views') + 1
        self.save()

    def get_points(self):
        return self.views + self.star_set.count() * 2 + self.comments.count() * 2

    def star_count(self):
        return self.star_set.count()

    @staticmethod
    def get_sorter():
        """
        Points = views + 2 * stars + 2 * comments

        :return: a sorter can be used for QuerySet.order_by()
        """
        return F('views') + (F('star') + F('comments')) * 2

    @staticmethod
    def get_popular():
        sorter = Report.get_sorter()
        return Report.objects.annotate(points=Count(sorter)).order_by('-points').distinct()

    @staticmethod
    def get_user_popular(user):
        sorter = Report.get_sorter()
        return Report.objects.filter(author=user).annotate(points=Count(sorter)).order_by('-points').distinct()


class Step(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='steps', on_delete=models.CASCADE)
    content_json = models.TextField()
    yield_method = models.TextField()

    def __str__(self):
        return 'id:{}'.format(self.pk)


class SubRoutine(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='subroutines', on_delete=models.CASCADE)
    content_json = models.TextField()
    yield_method = models.TextField()

    def __str__(self):
        return 'id:{}'.format(self.pk)


class Archive(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField()  # Trunc to month


class Label(models.Model):
    label_name = models.CharField(max_length=64, unique=True)

    def __str__(self):
        return 'id:{}, name:{}'.format(self.pk, self.label_name)


class Graph(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='report_graphs')
    graph = models.ImageField(upload_to='report_graph', null=True, blank=True)

    @property
    def get_name(self):
        return self.graph.name


class Comment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    text = models.TextField()
    time = models.DateTimeField(auto_now=True)
    to_report = models.ForeignKey(Report, on_delete=models.CASCADE, db_index=True, related_name='comments')
    reply_to = models.OneToOneField('self', on_delete=models.CASCADE, default=None, blank=True, null=True,
                                    related_name='replied_by')

    notices = GenericRelation('notices.Notice', 'target_id', 'target_type', related_query_name='comment')

    # @property
    # def all_sub_comments(self):
    #     return self.sub_comments.all().order_by('time')

    def __str__(self):
        return '{}, {}'.format(self.user, self.text)


# class CommentReply(Comment):
#     reply_to = models.OneToOneField(Comment, on_delete=models.CASCADE, default=None, blank=True, null=False,
#                                     related_name='replied_by')
#     super_comment = models.ForeignKey(Comment, on_delete=models.CASCADE, default=None, blank=True, null=True,
#                                       related_name='sub_comments')
