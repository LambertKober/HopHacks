from uuid import uuid4

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist

from server.model.student import Student
from server.serializer.student import StudentSerializer
from server.views.mixins import SelectionMixin


class StudentList(APIView, SelectionMixin):
    # TODO: list endpoint

    def post(self, request, *args, **kwargs):
        uuid = uuid4()
        student = Student(uuid=uuid, name=request.data.get("name"))
        student.save()
        self.create_selections(student, request.data["timeSlots"])
        return Response(data={"uuid": str(uuid)}, status=status.HTTP_201_CREATED)


class StudentItem(APIView, SelectionMixin):
    def get(self, request, student_id, *args, **kwargs):
        try:
            student = Student.objects.filter(uuid__exact=student_id).get()
            data = StudentSerializer(student).data
        except ObjectDoesNotExist:
            return Response(data={}, status=status.HTTP_404_NOT_FOUND)
        data["timeSlots"] = self.get_selections(student_id)
        return Response(data=data, status=status.HTTP_200_OK)

    def put(self, request, student_id, *args, **kwargs):
        try:
            student = Student.objects.filter(uuid__exact=student_id).get()
        except ObjectDoesNotExist:
            return Response(data={}, status=status.HTTP_404_NOT_FOUND)

        # TODO: Make difflist instead
        student.name = request.data["name"]

        self.delete_selections(student_id)
        self.create_selections(student_id, request.data["timeSlots"])
        return Response(data={"uuid": str(student_id)}, status=status.HTTP_200_OK)

    def delete(self, request, student_id, *args, **kwargs):
        try:
            student = Student.objects.filter(uuid__exact=student_id).get()
        except ObjectDoesNotExist:
            return Response(data={}, status=status.HTTP_404_NOT_FOUND)
        student.delete()
        self.delete_selections(student_id)
        return Response(data={"uuid": str(student_id)}, status=status.HTTP_200_OK)