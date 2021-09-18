from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import CreateAPIView, GenericAPIView
from rest_framework.mixins import DestroyModelMixin, RetrieveModelMixin, UpdateModelMixin

from server.model.ca import CA
from server.serializer.ca import CASerializer


class CACreate(CreateAPIView):
    queryset = CA.objects.all()
    serializer_class = CASerializer


class CAItem(RetrieveModelMixin,
             UpdateModelMixin,
             DestroyModelMixin,
             GenericAPIView):
    serializer_class = CASerializer

    def get_queryset(self):
        sess_id = self.kwargs['ca_id']
        return CA.objects.filter(id__exact=sess_id)

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.delete(request, *args, **kwargs)