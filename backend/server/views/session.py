from django.http import Http404
from rest_framework import status
from rest_framework.generics import GenericAPIView, ListCreateAPIView
from rest_framework.mixins import DestroyModelMixin, RetrieveModelMixin, UpdateModelMixin
from rest_framework.response import Response
from rest_framework.views import APIView

from server.serializer.schedule import ScheduleSerializer
from server.serializer.session import SessionSerializer
from server.scheduler.process import schedule_students
from server.model.selection import Selection
from server.model.session import Session
from server.transformer.scheduler import to_session_dtos, to_selection_dtos, to_schedule_model


class SessionList(ListCreateAPIView):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer


class SessionItem(RetrieveModelMixin,
                  UpdateModelMixin,
                  DestroyModelMixin,
                  GenericAPIView):
    serializer_class = SessionSerializer

    def get_queryset(self, *args, **kwargs):
        sess_id = self.kwargs['sess_id']
        return Session.objects.filter(uuid__exact=sess_id)

    def get_object(self, *args, **kwargs):
        sess_id = self.kwargs['sess_id']
        return Session.objects.filter(uuid__exact=sess_id).get()

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.delete(request, *args, **kwargs)


class SessionItemState(APIView):
    def get(self, request, sess_id, *args, **kwargs):
        serializer = SessionSerializer(Session.objects.filter(uuid__exact=sess_id).get())
        return Response(serializer.data)

    def post(self, request, sess_id, *args, **kwargs):
        sessions = Session.objects.all()
        selections = Selection.objects.all()
        models = to_schedule_model(schedule_students(to_session_dtos(sessions),
                                                     to_selection_dtos(selections)))
        for model in models:
            model.save()

        return Response(ScheduleSerializer(models, many=True).data, status.HTTP_200_OK)