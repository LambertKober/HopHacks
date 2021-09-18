from uuid import UUID, uuid4

from django.http import Http404
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView, GenericAPIView
from rest_framework.mixins import DestroyModelMixin, ListModelMixin, RetrieveModelMixin, UpdateModelMixin
from django.core.exceptions import ObjectDoesNotExist

from server.model.ca import CA
from server.serializer.ca import CASerializer
from server.views.mixins import SessionMixin


class CACreate(ListModelMixin, SessionMixin, GenericAPIView):
    queryset = CA.objects.all()
    serializer_class = CASerializer

    # TODO: list endpoint

    def post(self, request, *args, **kwargs):
        uuid = uuid4()
        ca = CA(uuid=request.data["uuid"])
        ca.save()
        self.update_sessions(uuid, request.data["sessions"])
        return Response(data={"uuid": str(uuid)}, status=status.HTTP_200_OK)


class CAItem(APIView, SessionMixin):
    def get(self, request, ca_id, *args, **kwargs):
        try:
            ca = CA.objects.filter(id__exact=ca_id).get()
            data = CASerializer(ca).data
        except ObjectDoesNotExist:
            return Response(data={}, status=status.HTTP_404_NOT_FOUND)
        data["sessions"] = self.get_sessions(ca.uuid)

    def put(self, request, ca_id, *args, **kwargs):
        try:
            ca = CA.objects.filter(id__exact=ca_id).get()
        except ObjectDoesNotExist:
            return Response(data={}, status=status.HTTP_404_NOT_FOUND)

        serializer = CASerializer(request)
        new_state = serializer.data
        ca.name = new_state.name
        ca.description = new_state.new

        self.update_sessions(ca_id, request.data["sessions"])
        return Response(data={"uuid": str(ca_id)}, status=status.HTTP_200_OK)

    def delete(self, request, ca_id, *args, **kwargs):
        try:
            CA.objects.filter(id__exact=ca_id).delete()
        except ObjectDoesNotExist:
            return Response(data={}, status=status.HTTP_404_NOT_FOUND)

        self.del_sessions(ca_id)
        return Response(data={"uuid": str(ca_id)}, status=status.HTTP_200_OK)
