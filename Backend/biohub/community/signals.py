from django.dispatch import receiver
from django.db.models.signals import pre_delete, post_save

from biohub.notices.models import Notice
from biohub.notices.tool import Dispatcher

from biohub.accounts.models import User
from biohub.accounts.user_defined_signals import follow_user_signal, unfollow_user_signal

from biohub.editor.models import Report, Comment

from biohub.community.models import Star


# Categories of notices:
# + Follow  -- Somebody follows you
# + Star    -- Somebody stars your report
# + Comment -- Somebody comments on your report

# Indirect notices:
# + FollowingReport -- User you followed writes a new report


@receiver(pre_delete, sender=Report)
def remove_report_notices(instance, using, **kwargs):
    Notice.objects.filter(report=instance).delete()
    Star.objects.filter(starred_report=instance).delete()


@receiver(follow_user_signal, sender=User)
def send_notice_to_followed_user(instance, target_user, **kwargs):
    Dispatcher('Follow').send(
        target_user,
        '%s started following you' % instance.username,
        actor=instance,
        target=instance
    )


@receiver(unfollow_user_signal, sender=User)
def remove_notices_on_unfollow(instance, target_user, **kwargs):
    Notice.objects.filter(
        user=target_user,
        actor=instance,
        category__contains='Follow'   # This deletes both 'Follow' and 'FollowingWhatever'
    ).delete()


@receiver(post_save, sender=Star)
def send_notice_to_starred_report_author(instance, raw, created, using, update_fields, **kwargs):
    if created:
        starrer = instance.starrer
        report = instance.starred_report
        author = report.author
        Dispatcher('Star').send(
            author,
            '%s starred your report %s' % (starrer.username, report.title),
            actor=starrer,
            target=instance
        )


@receiver(pre_delete, sender=Star)
def remove_notices_on_unstar(instance, using, **kwargs):
    Notice.objects.filter(
        user=instance.starred_report.author,
        actor=instance.starrer,
        star=instance
    ).delete()


@receiver(post_save, sender=Comment)
def send_notice_to_commented_report_author(instance, raw, created, using, update_fields, **kwargs):
    if created:
        commenter = instance.user
        report = instance.to_report
        if report.author == commenter:
            return
        Dispatcher('Comment').send(
            report.author,
            '%s commented on your report %s' % (commenter.username, report.title),
            actor=commenter,
            target=report,   # Set target to be report rather than comment
        )


@receiver(pre_delete, sender=Comment)
def remove_notices_on_delete_comment(instance, using, **kwargs):
    Notice.objects.filter(
        category='Comment',
        actor=instance.user,
        comment=instance
    ).delete()


@receiver(post_save, sender=Report)
def send_new_report_notice_to_followers(instance, raw, created, **kwargs):
    if created:
        author = instance.author
        for follower in author.followers.all():
            Dispatcher('FollowingReport').send(
                follower,
                '%s wrote a new report %s' % (author.username, instance.title),
                actor=author,
                target=instance
            )
