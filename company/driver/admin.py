from django.contrib import admin
from driver.models import Driver

# Register your models here.


@admin.register(Driver)
class DriverAdmin (admin.ModelAdmin):
    list_display = ('id', 'name', 'salary',
                    'start_date_of_employment', 'route')

    class Meta:
        model = Driver
