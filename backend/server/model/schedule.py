from django.db import models

from server.model.student import Student


class Schedule(models.Model):
    id = models.UUIDField(primary_key=True)
    startTime = models.DateTimeField
    stopTime = models.DateTimeField
    student = models.ForeignKey(Student)
