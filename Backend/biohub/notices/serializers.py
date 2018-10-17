from biohub.utils.rest.serializers import ModelSerializer, bind_model, rest_serializers

from .models import Notice


@bind_model(Notice)
class NoticeSerializer(ModelSerializer):
    target = rest_serializers.SerializerMethodField(allow_null=True, read_only=True)
    actor = rest_serializers.SerializerMethodField(allow_null=True, read_only=True)

    def get_target(self, instance):
        from biohub.community.models import Star
        from biohub.editor.models import Report
        from biohub.editor.serializers import ReportInfoSerializer
        from biohub.accounts.models import User
        from biohub.accounts.serializers import UserInfoSerializer

        if isinstance(instance.target, Star):
            # Return starred report instead of the star itself
            return ReportInfoSerializer(instance.target.starred_report, context=self.context).data
        elif isinstance(instance.target, User):
            data = UserInfoSerializer(instance.target, context=self.context).data
            stat = instance.target.get_stat()
            data['stat'] = stat
            return data
            # return UserInfoSerializer(instance.target).data
        elif isinstance(instance.target, Report):
            return ReportInfoSerializer(instance.target).data
        else:
            return {}

    def get_actor(self, instance):
        from biohub.accounts.models import User
        from biohub.accounts.serializers import UserInfoSerializer

        if isinstance(instance.actor, User):
            data = UserInfoSerializer(instance.actor, context=self.context).data
            stat = instance.actor.get_stat()
            data['stat'] = stat
            return data

        return None

    class Meta:
        fields = ('id', 'has_read', 'message', 'category', 'created', 'actor', 'target')
        model = Notice
