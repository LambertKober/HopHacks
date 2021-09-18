from django.db import models


class CA(models.Model):
    id = models.UUIDField
    name = models.TextField
    description = models.TextField
