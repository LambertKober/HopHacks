from server.dto.time import TimeBlock

class Session:
    def __init__(self, timeblock, uuid):
        self.timeblock: TimeBlock = timeblock
        self.uuid: str = uuid

class Selection:
    def __init__(self, timeblocks, uuid):
        self.timeblocks: list[TimeBlock] = timeblocks
        self.uuid: str = uuid

class Schedule:
    def __init__(self, timeblock, uuid):
        self.timeblock: TimeBlock = timeblock
        self.uuid: str = uuid