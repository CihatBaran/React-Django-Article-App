from rest_framework import serializers
from driver.models import Driver


class DriverSerializer(serializers.ModelSerializer):
    # name , salary,start_date_of_employment,route
    # name = serializers.CharField()
    # salary = serializers.FloatField()
    # route = serializers.CharField()
    salary_status = serializers.SerializerMethodField()
    start_date_of_employment = serializers.DateTimeField(format="%Y-%m-%d")

    class Meta:
        model = Driver
        fields = ('id', 'name', 'salary', 'route',
                  'start_date_of_employment', 'salary_status')

    def get_salary_status(self, instance):
        if instance.salary > 4000:
            return "Average"
        else:
            return "Normal"
