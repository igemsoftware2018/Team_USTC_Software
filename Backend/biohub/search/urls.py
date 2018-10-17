from biohub.core.routes import register_api, url
from rest_framework.routers import DefaultRouter

from . import views

register_api(r'^', [
    url(r'^search/', views.search, name='search')
], 'search')
