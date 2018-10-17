from rest_framework import serializers
from biohub.editor.serializers import ReportInfoSerializer
from biohub.community.models import Collection


class StarRequestSerializer(serializers.Serializer):
    id = serializers.IntegerField()


class CollectRequestSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    collection = serializers.CharField()


class UncollectRequestSerializer(serializers.Serializer):
    id = serializers.IntegerField()


class CollectionSerializer(serializers.ModelSerializer):
    collector = serializers.HiddenField(default=serializers.CurrentUserDefault())
    reports = ReportInfoSerializer(many=True, required=False)

    def update(self, instance, validated_data):
        try:
            instance.reports = validated_data['reports']
        except KeyError:
            pass

        try:
            instance.name = validated_data['name']
        except KeyError:
            pass

        instance.save()
        return instance

    def create(self, validated_data):
        obj = Collection.objects.create(
            collector=validated_data['collector'],
            name=validated_data['name']
        )
        obj.reports = reports=validated_data.get('reports', None)
        obj.save()
        return obj

    class Meta:
        model = Collection
        fields = ('id', 'collector', 'name', 'reports')
