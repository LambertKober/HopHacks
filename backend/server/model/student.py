from django.db import models


class Student(models.Model):
    uuid = models.UUIDField
    name = models.TextField
