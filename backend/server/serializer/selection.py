from rest_framework.serializers import ModelSerializer

from server.model.selection import Selection


class SelectionSerializer(ModelSerializer):
    class Meta:
        model = Selection
        fields = ['uuid', 'startTime', 'endTime', 'student']
