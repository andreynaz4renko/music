from django.db import models
from authentication.models import User

class Item(models.Model):
    """A model of a history."""

    created = models.DateTimeField(auto_now_add=True)
    username = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField("Item's name", max_length=200)

    class Meta:
        ordering = ['created']
