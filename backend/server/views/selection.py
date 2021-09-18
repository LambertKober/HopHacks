from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from server.serializer.ca import CASerializer


class SelectionCreate(APIView):
    def post(self, request, format=None):
        serializer = CASerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SelectionItem(APIView):
    def get(self, request, id, format=None):
        pass

    def put(self, request, id, format=None):
        pass

    def delete(self, request, id, format=None):
        pass
