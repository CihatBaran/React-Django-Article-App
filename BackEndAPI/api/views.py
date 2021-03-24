from django.shortcuts import render

# Create your views here.
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions

schema_view = get_schema_view(
    openapi.Info(
        title="Article API",
        default_version='v1',
        description="Article API CRUD",
        contact=openapi.Contact(email="cihatbarann@gmail.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)
