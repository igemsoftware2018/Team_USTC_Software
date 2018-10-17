from django.utils import timezone
from django.core.exceptions import ObjectDoesNotExist
from django.utils.encoding import smart_text
from rest_framework import serializers, fields
from biohub.accounts.models import User
from biohub.accounts.serializers import UserInfoSerializer
from .models import Report, Step, SubRoutine, Label, Archive, Graph, Comment


class CreatableSlugRelatedField(serializers.SlugRelatedField):
    """
    This is a custom SlugRelatedField that automatically create a field instead of
    signalling an error.
    """
    def to_internal_value(self, data):
        try:
            return self.get_queryset().get_or_create(**{self.slug_field: data})[0]
        except ObjectDoesNotExist:
            self.fail('does_not_exist', slug_name=self.slug_field, value=smart_text(data))
        except (TypeError, ValueError):
            self.fail('invalid')


class LabelInfoSerializer(serializers.Serializer):
    """
    Only id, name, report_count are provided.
    """
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField()

    def to_internal_value(self, data):
        label, _ = Label.objects.get_or_create(name=data)
        return label

    def to_representation(self, instance):
        return {
            'id': instance.id,
            'name': instance.label_name,
            'report_count': instance.reports_related.count()
        }

    def update(self, instance, validated_data):
        assert (instance.id == validated_data['id'])
        instance.label_name = validated_data['name']
        instance.save()
        return instance

    def create(self, validated_data):
        label, _ = Label.objects.get_or_create(label_name=validated_data['name'])
        return label


class ReportSerializer(serializers.ModelSerializer):
    author = serializers.SlugRelatedField(slug_field='username', read_only=True,
                                          default=serializers.CurrentUserDefault())
    label = CreatableSlugRelatedField(slug_field='label_name', many=True, required=False,
                                      queryset=Label.objects.all())
    ntime = serializers.DateTimeField(default=serializers.CreateOnlyDefault(timezone.now()))

    class Meta:
        model = Report
        fields = ('id', 'title', 'envs', 'author', 'introduction', 'label', 'ntime', 'mtime', 'result', 'subroutines')


class ReportInfoSerializer(serializers.BaseSerializer):
    """
    This is a read-only serializer for Report.  It's used when contents are not necessary.
    """
    id = serializers.IntegerField()
    title = serializers.CharField()
    author = UserInfoSerializer(read_only=True)
    labels = LabelInfoSerializer(many=True, read_only=True)
    abstract = serializers.CharField()
    commentsnum = serializers.IntegerField()
    likesnum = serializers.IntegerField()

    def to_internal_value(self, data):
        try:
            return Report.objects.get(id=int(data))
        except:
            return Report.objects.get(**data)

    def isliked(self, instance):
        if 'user' not in self.context or not self.context['user'] or not self.context['user'].is_active:
            return False

        return instance.star_set.filter(starrer=self.context['user']).count() >= 1

    def iscollected(self, instance):
        if 'user' not in self.context or not self.context['user'] or not self.context['user'].is_active:
            return False

        return instance.collection_set.filter(collector=self.context['user']).count() >= 1

    def to_representation(self, instance):
        cls = ReportInfoSerializer
        return {
            'id': instance.id,
            'title': instance.title,
            'author': cls.author.to_representation(instance.author),
            'labels': cls.labels.to_representation(instance.label.all()),
            'abstract': instance.introduction,
            'commentsnum': instance.comments.count(),
            'likesnum': instance.star_set.count(),
            'isliked': self.isliked(instance),
            'iscollected': self.iscollected(instance)
        }


class PopularReportSerializer(serializers.ModelSerializer):
    praises = serializers.IntegerField(source='star_count')

    class Meta:
        model = Report
        fields = ('id', 'title', 'praises')


class StepSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Step
        fields = ('id', 'user', 'content_json', 'yield_method')


class SubRoutineSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = SubRoutine
        fields = ('id', 'user', 'content_json', 'yield_method')


class LabelSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField()
    report_count = serializers.IntegerField(read_only=True)
    reports = ReportInfoSerializer(many=True, read_only=True)
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    def to_representation(self, instance):
        queryset = Report.objects.filter(label=instance)
        return {
            'id': instance.id,
            'name': instance.label_name,
            'reports_count': queryset.count(),
            'reports': ReportInfoSerializer(queryset, many=True).data
        }

    def update(self, instance, validated_data):
        assert (instance.id == validated_data['id'])
        instance.label_name = validated_data['name']
        instance.save()
        return instance

    def create(self, validated_data):
        label, _ = Label.objects.get_or_create(label_name=validated_data['name'])
        return label


class ArchiveSerializer(serializers.ModelSerializer):
    reports = ReportInfoSerializer(many=True, read_only=True)

    class Meta:
        model = Archive
        fields = ('id', 'date', 'reports')


class ArchiveInfoSerializer(serializers.ModelSerializer):
    report_count = serializers.IntegerField()

    def to_representation(self, instance: Archive):
        return {
            'id': instance.id,
            'date': instance.date,
            'report_count': instance.reports.count()
        }

    class Meta:
        model = Archive
        fields = ('id', 'date', 'report_count')


class GraphSerializer(serializers.ModelSerializer):
    # url = serializers.URLField()
    pk = serializers.IntegerField(read_only=True)
    # owner = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    graph = serializers.ImageField()
    name = serializers.CharField(source='get_name')

    class Meta:
        model = Graph
        fields = ('graph', 'pk', 'name')


class CommentSerializer(serializers.ModelSerializer):
    # user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    user = UserInfoSerializer()
    text = serializers.CharField()
    to_report = serializers.PrimaryKeyRelatedField(queryset=Report.objects.all())
    time = serializers.DateTimeField()
    reply_to = serializers.PrimaryKeyRelatedField(queryset=Comment.objects.all())

    class Meta:
        model = Comment
        fields = ('user', 'text', 'to_report', 'time', 'reply_to')
