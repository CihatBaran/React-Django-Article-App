from django.db import models

# Create your models here.


class Article(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    date = models.DateTimeField(auto_now=True)
    author = models.ForeignKey("auth.User", on_delete=models.CASCADE,
                               verbose_name="Name of the Auther", default=1)

    def __str__(self):
        return self.title
