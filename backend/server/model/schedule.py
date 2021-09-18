from django.db import models

from server.model.student import Student


class ScheduleSlot(models.Model):
    uuid = models.UUIDField
    startTime = models.DateTimeField
    stopTime = models.DateTimeField
    student = models.OneToOneRel(Student)
