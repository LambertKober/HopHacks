from django.db import models

from server.model.student import Student


class Selection(models.Model):
    uuid = models.UUIDField
    startTime = models.DateTimeField
    endTime = models.DateTimeField
    student = models.ForeignKey(Student)