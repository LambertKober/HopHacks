from rest_framework.serializers import ModelSerializer

from server.model.schedule import ScheduleSlot


class ScheduleSerializer(ModelSerializer):
    class Meta:
        model = ScheduleSlot
        fields = ['uuid', 'startTime', 'endTime', 'student']
