from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.exceptions import ValidationError
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.pagination import LimitOffsetPagination
from driver.serializers import DriverSerializer
from driver.models import Driver


class DriverPagination(LimitOffsetPagination):
    default_limit = 20
    max_limit = 100


class DriverListAPI(ListAPIView):
    queryset = Driver.objects.all()

    serializer_class = DriverSerializer
    pagination_class = DriverPagination
    filter_backends = (DjangoFilterBackend, SearchFilter,)
    filter_fields = ('id',)
    search_fields = ('name',)


class DriverCreateAPI(CreateAPIView):
    serializer_class = DriverSerializer

    def create(self, request, *args, **kwargs):
        # name, #salary, #route
        name = request.data.get('name')
        salary = request.data.get('salary')
        route = request.data.get('route')

        try:
            if float(salary) > 10000.00:
                raise ValidationError(
                    {'price': 'Should not be above 9,999'})
            elif float(salary) <= 2000.00:
                raise ValidationError(
                    {'price': 'Should not be less than 2, 000'})
        except ValueError:
            raise ValidationError({'price': 'price should be number'})

        return super().create(request, *args, **kwargs)


class DriverRetrieveUpdateDestroyAPI (RetrieveUpdateDestroyAPIView):
    serializer_class = DriverSerializer
    queryset = Driver.objects.all()
    lookup_field = ('id')
