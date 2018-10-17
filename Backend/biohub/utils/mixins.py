

# If your ViewSet is a ModelViewSet, and you would like to use request.user in the serializer_class
# Then include this mixin in your viewset
class PassUserToSerializer:
    def get_serializer(self, *args, **kwargs):
        serializer_class = getattr(self, 'serializer_class')
        context = kwargs.pop('context', {})

        return serializer_class(context={'user': self.request.user}, *args, **kwargs)
