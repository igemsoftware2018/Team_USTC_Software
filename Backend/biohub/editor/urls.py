from rest_framework.routers import DefaultRouter
from rest_framework_nested import routers
from biohub.core.routes import register_api, register_default, url
from . import views

router = DefaultRouter()
router.register('step', views.StepViewSet, base_name='step')
router.register('subroutine', views.SubRoutineViewSet, base_name='subroutine')
router.register('report', views.ReportViewSet, base_name='report')
router.register('label', views.LabelViewSet, base_name='label')
router.register('archive', views.ArchiveViewSet, base_name='archive')
router.register('graph', views.PictureViewSet, base_name='graph')
router.register('vars', views.UserVariableViewSet, base_name='vars')
router.register('comment', views.CommentPostSingleViewSet, base_name='comment')

comment_router = routers.NestedSimpleRouter(router, 'comment', lookup='comment')
# comment_router.register(r'nameservers', views.CommentPostSingleViewSet, base_name='domain-comment')

register_api(r'^editor/', router.urls)
register_api(r'^editor/', comment_router.urls)
register_api(r'^', [
    url(r'^users/labels/(?P<user_id>[0-9]+)/$', views.LabelViewSet.list_user_labels),
    url(r'^users/popular-reports-list/?$', views.ReportViewSet.get_popular_reports),
    url(r'^reports-simple/(?P<report_id>[0-9]+)/?$', views.ReportViewSet.get_report_simple),
    url(r'^users/popular-reports-list/(?P<user_id>[0-9]+)/?$', views.ReportViewSet.get_user_popular_reports),
    url(r'^users/reports/archives/(?P<user_id>[0-9]+)/?$', views.ReportViewSet.get_user_archives),
    url(r'^users/reports/(?P<user_id>[0-9]+)/?$', views.ReportViewSet.list_user_reports, name='list_reports'),
    url(r'^editor/comment/get_report_comment/(?P<report_pk>[0-9]+)/?$',
        views.CommentPostSingleViewSet.get_report_comment, name='get_report_comment'),
], '')
