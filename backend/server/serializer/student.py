from rest_framework.serializers import ModelSerializer

from server.model.session import Session


class StudentSerializer(ModelSerializer):
    class Meta:
        model = Session
        fields = {'uuid', 'name'}