from datetime import datetime
import heapq


from server.dto.time import TimeBlock
from server.model.session import Session
from server.serializer.session import SessionSerializer


class SessionMixin:
    def update_sessions(self, ca_uuid, time_slots):
        timestamps = []
        for time_slot in time_slots:
            heapq.heappush(timestamps, datetime.fromisoformat(time_slot))
        timestamps = [heapq.heappop(timestamps) for i in range(len(timestamps))]
        time_blocks = TimeBlock.list_from_sorted_starts(timestamps, 15)
        for block in time_blocks:
            session = Session(name="foo", startTime=block.start, endTime=block.end, ca=ca_uuid,
                              status=Session.Status.SCHEDULED)
            session.save()

    def get_sessions(self, ca_uuid):
        sessions = Session.ca_set.filter(uuid=ca_uuid).all()
        return SessionSerializer(sessions, many=True)

    def del_sessions(self, ca_uuid):
        sessions = Session.ca_set.filter(uuid=ca_uuid).all()
        for session in sessions:
            session.delete()
