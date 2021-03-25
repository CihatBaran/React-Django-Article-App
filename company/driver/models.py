from django.db import models

# Create your models here.


class Driver(models.Model):
    # id, name, salary, start_date_of_employment, route
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    salary = models.FloatField()
    start_date_of_employment = models.DateTimeField(auto_now=True)
    route = models.CharField(max_length=400)

    def __str__(self):
        return self.name
