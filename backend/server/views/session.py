from django.http import Http404
from rest_framework.generics import GenericAPIView, ListCreateAPIView
from rest_framework.mixins import DestroyModelMixin, RetrieveModelMixin, UpdateModelMixin
from rest_framework.views import APIView

from server.serializer.session import SessionSerializer
from server.model.selection import Selection
from server.model.session import Session


class SessionList(ListCreateAPIView):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer


class SessionItem(RetrieveModelMixin,
                  UpdateModelMixin,
                  DestroyModelMixin,
                  GenericAPIView):
    serializer_class = SessionSerializer

    def get_queryset(self):
        sess_id = self.kwargs['sess_id']
        return Session.objects.filter(id__exact=sess_id)

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.delete(request, *args, **kwargs)


class SessionItemState(APIView):
    def get(self, request, sess_id, *args, **kwargs):
        return Session.objects.filter(id__exact=sess_id)

    def get(self, request, sess_id, *args, **kwargs):
        session = Session.objects.all()
        selections = Selection.objects.all()