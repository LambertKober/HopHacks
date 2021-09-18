from django.db import models


class OfficeHour(models.Model):
    id = models.UUIDField(primary_key=True)
    name = models.TextField
