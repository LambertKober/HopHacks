from rest_framework.serializers import ModelSerializer

from server.model.session import Session


class SelectionSerializer(ModelSerializer):
    class Meta:
        model = Session
        fields = {'uuid', 'startTime', 'endTime', 'student'}
