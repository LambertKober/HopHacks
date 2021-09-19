from rest_framework.serializers import ModelSerializer

from server.model.student import Student


class StudentSerializer(ModelSerializer):
    class Meta:
        model = Student
        fields = ['uuid', 'name']