from rest_framework import serializers
from driver.models import Driver

from django.contrib.auth import get_user_model
from rest_framework.authtoken.views import Token
from django.utils import timezone


class DriverSerializer(serializers.ModelSerializer):
    # name , salary,start_date_of_employment,route
    # name = serializers.CharField()
    # salary = serializers.FloatField()
    # route = serializers.CharField()
    salary_status = serializers.SerializerMethodField()
    start_date_of_employment = serializers.DateTimeField(format="%Y-%m-%d", default=timezone.now())

    class Meta:
        model = Driver
        fields = ('id', 'name', 'salary', 'route',
                  'start_date_of_employment', 'salary_status')

    def get_salary_status(self, instance):
        if instance.salary > 4000:
            return "Average"
        else:
            return "Normal"


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        style={'input_type': 'password', 'placeholder': 'Password'},
        trim_whitespace=False)

    class Meta:
        model = get_user_model()
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {
            'write_only': True,
            'required': True
        }}

    def create(self, validated_data):
        instance = get_user_model().objects.create_user(**validated_data)
        Token.objects.create(user=instance)
        return instance
