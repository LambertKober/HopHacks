from rest_framework.serializers import ModelSerializer

from server.model.session import Session


class SessionSerializer(ModelSerializer):
    class Meta:
        model = Session
        fields = {'uuid', 'name', 'stopTime', 'student'}
