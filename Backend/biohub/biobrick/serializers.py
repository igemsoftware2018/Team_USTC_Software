from rest_framework import serializers
from rest_framework.exceptions import Throttled
from haystack.models import SearchResult

from biohub.utils.rest.fields import PackedField

from biohub.forum.serializers.article_serializers import ArticleSerializer
from biohub.utils.rest.serializers import bind_model, ModelSerializer
from .models import Biobrick
from .highlighter import SimpleHighlighter


class RateSerializer(serializers.Serializer):

    score = serializers.DecimalField(max_digits=2, decimal_places=1, max_value=5, min_value=0)

    def create(self, validated_data):

        from django.core.cache import cache
        from biohub.core.conf import settings as biohub_settings

        key = 'user_{}_rate'.format(self.context['user'].id)
        if cache.get(key) is not None:
            raise Throttled()
        cache.set(key, 1, timeout=biohub_settings.THROTTLE['rate'])

        return self.context['brick'].rate(
            self.context['user'], validated_data['score']
        )


@bind_model(Biobrick)
class BiobrickSerializer(ModelSerializer):
    ac = PackedField()
    ruler = PackedField()
    parameters = PackedField()
    document = ArticleSerializer(fields=('text', 'digest'))
    desc = serializers.SerializerMethodField()

    class Meta:
        model = Biobrick
        exclude = ('favorite', 'has_barcode', 'review_count', 'review_total',
                   'sequence_length', 'last_fetched', 'ok', 'dominant')

    @classmethod
    def short_creator(cls, fields=(
        'part_name', 'part_type', 'rate_score', 'stars', 'rates', 'watches', 'uses'
    )):
        return cls.creator(
            fields=fields
        )

    @classmethod
    def list_creator(cls):
        return cls.creator(
            fields=(
                'part_name',
                'part_type',
                'status',
                'rate_score',
                'stars',
                'rates',
                'watches',
                'uses',
                'weight',
                'author',
                'part_status',
                'sample_status',
                'desc'
            )
        )

    def get_desc(self, instance):
        return instance.index_description

    def to_representation(self, obj):

        super_func = super(BiobrickSerializer, self).to_representation

        if isinstance(obj, SearchResult):
            ret = super_func(obj.object)

            # To get highlight
            if obj.highlighted is not None and len(obj.highlighted) > 0:
                ret['desc'] = obj.highlighted[0]

            querydict = self.context['request'].query_params
            if 'highlight' in querydict:
                highlighter = SimpleHighlighter(
                    querydict.get('q', ''),
                    html_tag='div',
                    css_class='highlight'
                )
                ret['part_name'] = highlighter.highlight(ret['part_name'])
        else:
            ret = super_func(obj)

        return ret
