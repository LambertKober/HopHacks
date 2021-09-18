from django.db import models

from server.model.ca import CA


class Session(models.Model):
    id = models.UUIDField
    name = models.TextField
    stopTime = models.DateTimeField
    student = models.ForeignKey(CA)
    status = models.IntegerField
