from django.db.models import Q
from rest_framework import viewsets, mixins, decorators
from rest_framework.response import Response
from biohub.utils.mixins import PassUserToSerializer
from biohub.utils.rest import pagination, permissions as p

from .serializers import NoticeSerializer
from .models import Notice


class NoticeViewSet(
        mixins.ListModelMixin,
        mixins.RetrieveModelMixin,
        viewsets.GenericViewSet,
        PassUserToSerializer):

    serializer_class = NoticeSerializer
    pagination_class = pagination.factory('PageNumberPagination')
    permission_classes = [p.C(p.IsAuthenticated) &
                          p.check_owner('user', ('GET',))]
    filter_fields = ('has_read', 'category')

    def get_queryset(self):
        qs = Notice.objects.user_notices(self.request.user)

        id_list = self.request.query_params.get('ids', None)
        if id_list is not None:
            qs = qs.filter(id__in=id_list.split(','))

        return qs.order_by('-created')

    @decorators.list_route(['GET'])
    def mark_all_as_read(self, *args, **kwargs):
        self.get_queryset().mark_read()

        return Response('OK')

    @decorators.detail_route(['GET'])
    def mark_read(self, *args, **kwargs):
        self.get_object().mark_read()

        return Response('OK')

    @decorators.list_route(['GET'])
    def categories(self, *args, **kwargs):
        return Response(self.get_queryset().categories())

    @decorators.list_route(['GET'])
    def stats(self, *args, **kwargs):
        return Response(self.get_queryset().stats())

    @decorators.list_route(['GET'])
    def feeds(self, request, *args, **kwargs):
        """
        News from the users you're following.
        """
        qs = self.get_queryset().filter(category__startswith='Following').all()
        page = self.paginate_queryset(qs)
        qs.mark_read()  # See issue 40
        return self.get_paginated_response(NoticeSerializer(page, many=True).data)

    @decorators.list_route(['GET'])
    def has_new_feeds(self, request, *args, **kwargs):
        """
        Check if there is a new feed.
        """
        n_feeds = self.get_queryset().filter(category__startswith='Following', has_read=False).count()
        return Response({
            'count': n_feeds
        })

    @decorators.list_route(['GET'])
    def my(self, request, *args, **kwargs):
        """
        Notifications sent specifically to the current user.
        """
        qs = self.get_queryset().filter(~Q(category__startswith='Following')).all()
        page = self.paginate_queryset(qs)
        qs.mark_read()  # See issue 40
        return self.get_paginated_response(NoticeSerializer(page, many=True).data)

    @decorators.list_route(['GET'])
    def has_new_notifications(self, request, *args, **kwargs):
        """
        Check if there is a new notification.
        """
        qs = self.get_queryset().filter(~Q(category__startswith='Following'), has_read=False)
        notice = qs.first()
        return Response({
            'count': qs.count(),
            'latest': NoticeSerializer(notice).data
        })
