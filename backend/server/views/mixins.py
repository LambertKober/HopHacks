from uuid import uuid4
import heapq

from dateutil.parser import isoparse

from server.dto.time import TimeBlock
from server.model.selection import Selection
from server.model.session import Session
from server.serializer.selection import SelectionSerializer
from server.serializer.session import SessionSerializer

class TimeBlockMixin:
    pass

class SessionMixin:
    def create_sessions(self, ca, student_limit, time_slots):
        if time_slots is None:
            return
        timestamps = []
        for time_slot in time_slots:
            heapq.heappush(timestamps, isoparse(time_slot))
        timestamps = [heapq.heappop(timestamps) for i in range(len(timestamps))]
        time_blocks = TimeBlock.list_from_sorted_starts(timestamps, 15)
        for block in time_blocks:
            uuid = uuid4()
            session = Session(uuid=uuid, startTime=block.start, endTime=block.end, ca=ca,
                              studentLimit=student_limit, status=Session.Status.SCHEDULED)
            session.save()

    def get_sessions(self, ca_uuid):
        sessions = Session.objects.filter(ca__uuid__exact=ca_uuid).all()
        return SessionSerializer(sessions, many=True).data

    def delete_sessions(self, ca_uuid):
        sessions = Session.objects.filter(ca__uuid__exact=ca_uuid).all()
        for session in sessions:
            session.delete()

class SelectionMixin:
    def create_selections(self, student, time_slots):
        if time_slots is None:
            return
        timestamps = []
        for time_slot in time_slots:
            heapq.heappush(timestamps, isoparse(time_slot))
        timestamps = [heapq.heappop(timestamps) for i in range(len(timestamps))]
        time_blocks = TimeBlock.list_from_sorted_starts(timestamps, 15)
        for block in time_blocks:
            selection = Selection(uuid=student.uuid, startTime=block.start, endTime=block.end,
                                  student=student)
            selection.save()

    def get_selections(self, student_uuid):
        selection = Selection.objects.filter(student__uuid__exact=student_uuid).all()
        return SelectionSerializer(selection, many=True).data

    def delete_selections(self, student_uuid):
        selection = Selection.objects.filter(student__uuid__exact=student_uuid).all()
        for session in selection:
            session.delete()
