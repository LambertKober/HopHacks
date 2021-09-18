from rest_framework.serializers import ModelSerializer

from server.model.schedule import Schedule


class ScheduleSerializer(ModelSerializer):
    class Meta:
        model = Schedule
        fields = {'id', 'name', 'stopTime', 'student'}
