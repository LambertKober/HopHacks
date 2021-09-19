from server.dto.time import TimeBlock


class Session:
    def __init__(self, timeblock, ca_uuid, max_students):
        self.timeblock: TimeBlock = timeblock
        self.ca_uuid: str = ca_uuid
        self.max_students = max_students


class Selection:
    def __init__(self, timeblocks, student_uuid):
        self.timeblocks: list[TimeBlock] = timeblocks
        self.student_uuid: str = student_uuid


class Schedule:
    def __init__(self, timeblock, student_uuid):
        self.timeblock: TimeBlock = timeblock
        self.student_uuid: str = student_uuid