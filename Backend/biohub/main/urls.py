from biohub.core.routes import urlpatterns as biohub_urlpatterns

from django.conf import settings
from django.conf.urls import url
from django.views.static import serve as static_serve

urlpatterns = biohub_urlpatterns[:]

if settings.DEBUG:
    def serve(request, path, document_root=None, show_indexes=False):
        """
        An override to `django.views.static.serve` that will allow us to add our
        own headers for development.

        Like `django.views.static.serve`, this should only ever be used in
        development, and never in production.

        NOTE: Use `runserver --nostatic` to avoid staticfiles automatically add urlconf.
        """
        response = static_serve(request, path, document_root=document_root,
                                show_indexes=show_indexes)

        response['Access-Control-Allow-Origin'] = '*'
        return response

    urlpatterns += [
        url(r'^media/(?P<path>.*)$', serve,
            dict(document_root=settings.MEDIA_ROOT))
    ]
