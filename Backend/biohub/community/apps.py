# Just a reminder here...
#
# This app maintains some community "relationships" among users, reports, collections, etc.
#
# - Star
#   + A user can star many reports
# - Collection
#   + A user has many collections
#   + A collection consists of many reports
#   + A collection can be private (?)
#
# Relevant users will be notified of these activities ('notices'). Thus this app is called 'community'.

from django.apps import AppConfig


class CommunityConfig(AppConfig):
    name = 'biohub.community'
    label = 'community'
    times_calling_ready_method = 0

    def ready(self):
        CommunityConfig.times_calling_ready_method += 1
        if CommunityConfig.times_calling_ready_method <= 1:
            import biohub.community.signals  # noqa
