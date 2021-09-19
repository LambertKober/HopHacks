from django.db import models


class CA(models.Model):
    uuid = models.UUIDField()
    name = models.TextField()
    description = models.TextField()

    class Meta:
        app_label = "server"
