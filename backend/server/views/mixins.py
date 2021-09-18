from datetime import datetime
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
        timestamps = []
        for time_slot in time_slots:
            heapq.heappush(timestamps, isoparse(time_slot))
        timestamps = [heapq.heappop(timestamps) for i in range(len(timestamps))]
        time_blocks = TimeBlock.list_from_sorted_starts(timestamps, 15)
        for block in time_blocks:
            session = Session(startTime=block.start, endTime=block.end, ca=ca.uuid,
                              studentLimit=student_limit, status=Session.Status.SCHEDULED)
            session.save()

    def get_sessions(self, ca_uuid):
        sessions = Session.ca_set.filter(uuid=ca_uuid).all()
        return SessionSerializer(sessions, many=True)

    def deletion_sessions(self, ca_uuid):
        sessions = Session.ca_set.filter(uuid=ca_uuid).all()
        for session in sessions:
            session.delete()

class SelectionMixin:
    def create_selections(self, student, time_slots):
        timestamps = []
        for time_slot in time_slots:
            heapq.heappush(timestamps, isoparse(time_slot))
        timestamps = [heapq.heappop(timestamps) for i in range(len(timestamps))]
        time_blocks = TimeBlock.list_from_sorted_starts(timestamps, 15)
        for block in time_blocks:
            selection = Selection(startTime=block.start, endTime=block.end, ca=student.uuid,
                              status=Session.Status.SCHEDULED)
            selection.save()

    def get_selections(self, student_uuid):
        selection = Selection.student_set.filter(uuid=student_uuid).all()
        return SelectionSerializer(selection, many=True)

    def delete_selections(self, student_uuid):
        selection = Selection.student_set.filter(uuid=student_uuid).all()
        for session in selection:
            session.delete()
