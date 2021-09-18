from django.db import models

from server.model.ca import CA


class Session(models.Model):
    class Status(models.IntegerChoices):
        SCHEDULED = 1,
        STARTED = 2
    startTime = models.DateTimeField
    endTime = models.DateTimeField
    ca = models.ForeignKey(CA)
    studentLimit = models.IntegerField
    status = models.IntegerField(choices=Status.choices)
