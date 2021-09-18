from django.db import models

from server.model.student import Student


class Selection(models.Model):
    uuid = models.UUIDField
    startTime = models.DateTimeField
    stopTime = models.DateTimeField
    student = models.ForeignKey(Student)