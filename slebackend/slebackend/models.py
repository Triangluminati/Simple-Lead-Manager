from django.db import models

class SLE(models.Model):
    name = models.CharField(max_length=100)
    company = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    status = models.CharField(max_length=100)

    def __str__(self):
        return self.name