from rest_framework.serializers import ModelSerializer, ChoiceField

from server.model.session import Session


class SessionSerializer(ModelSerializer):
    status = ChoiceField(
        (
            (1, "SCHEDULED"),
            (2, "STARTED")
        )
    )

    class Meta:
        model = Session
        fields = ['uuid', 'startTime', 'endTime', 'ca', 'studentLimit', 'status']
