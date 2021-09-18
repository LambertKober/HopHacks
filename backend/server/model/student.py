from django.db import models


class Student(models.Model):
    id = models.UUIDField
    name = models.TextField
