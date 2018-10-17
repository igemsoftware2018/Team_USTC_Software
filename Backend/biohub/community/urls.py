from rest_framework.routers import DefaultRouter
from biohub.core.routes import register_api, register_default, url
from biohub.community import views

router = DefaultRouter()
router.register(r'users/favorites', views.StarViewSet, base_name='favorites')
router.register(r'users/collections', views.CollectionViewSet, base_name='collections')

# Place your route definition here.
register_api(r'^', [
    url(r'^users/collect/?$', views.collect, name='collect'),
    url(r'^users/uncollect/?', views.uncollect, name='uncollect'),
    url(r'^active-users/?$', views.ActiveUsersViewSet.as_view(), name='active-users')
] + router.urls, 'community')
