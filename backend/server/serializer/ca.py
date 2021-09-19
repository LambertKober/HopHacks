from rest_framework.serializers import ModelSerializer

from server.model.ca import CA


class CASerializer(ModelSerializer):
    class Meta:
        model = CA
        fields = ['uuid', 'name', 'description']
