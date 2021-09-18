from server.constants import OFFICE_HOUR_INTERVAL
from server.dto.scheduler import Schedule, Selection, Session
from server.dto.time import TimeBlock
from server.model.schedule import ScheduleSlot
from server.model.student import Student


def to_session_dtos(models):
    output = []
    for model in models:
        output.append(Session(TimeBlock(model.startTime, model.endTime, OFFICE_HOUR_INTERVAL),
                              model.ca.uuid, model.studentLimit))
    return output


def to_selection_dtos(models):
    output = []
    for model in models:
        output.append(Selection(TimeBlock(model.startTime, model.endTime, OFFICE_HOUR_INTERVAL),
                                model.ca.uuid))


def to_schedule_model(dtos):
    output = []
    for dto in dtos:
        output.append(ScheduleSlot(startTime=dto.timeblock.start,
                                   endTime=dto.timeblock.end,
                                   uuid=dto.uuid,
                                   student=Student.objects.filter(uuid__exact=dto.uuid).get()))
