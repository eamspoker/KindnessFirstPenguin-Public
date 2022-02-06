from django.db import models

# Create your models here.
class ChromeUser(models.Model):
  email = models.EmailField(max_length=254)
  text = models.TextField()

  def __str__(self):
    return self.email
