from django.db import models

from server.model.ca import CA


class Session(models.Model):
    class Status(models.IntegerChoices):
        SCHEDULED = 1,
        STARTED = 2

    uuid = models.UUIDField()
    startTime = models.DateTimeField()
    endTime = models.DateTimeField()
    ca = models.ForeignKey(CA, on_delete=models.CASCADE)
    studentLimit = models.IntegerField()
    status = models.IntegerField(choices=Status.choices)
