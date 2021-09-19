from datetime import timedelta

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
    output = {}
    for model in models:
        if model.student.uuid in output:
            output[model.student.uuid].timeblocks.append(TimeBlock(model.startTime,
                                                                   model.endTime,
                                                                   OFFICE_HOUR_INTERVAL))
        else:
            output[model.student.uuid] = Selection([TimeBlock(model.startTime,
                                                              model.endTime,
                                                              OFFICE_HOUR_INTERVAL)],
                                                   model.student.uuid)
    output_list = []
    for val in output.values():
        output_list.append(val)
    return output_list


def to_schedule_model(dtos):
    output = []
    for dto in dtos:
        output.append(ScheduleSlot(startTime=dto.start_time,
                                   endTime=dto.start_time + timedelta(minutes=OFFICE_HOUR_INTERVAL),
                                   uuid=dto.uuid,
                                   student=Student.objects.filter(uuid__exact=dto.uuid).get()))
    return output
