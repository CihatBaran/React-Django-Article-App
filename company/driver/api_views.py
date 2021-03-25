from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveUpdateDestroyAPIView, ListCreateAPIView
from rest_framework.exceptions import ValidationError
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.pagination import LimitOffsetPagination
from driver.serializers import DriverSerializer, UserSerializer
from driver.models import Driver
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import BasePermission, IsAuthenticated
from django.contrib.auth import get_user_model


class DriverPagination(LimitOffsetPagination):
    default_limit = 20
    max_limit = 100


# class OnlyForPostUserPermission(BasePermission):
#     """This ensures that only authenticated user can delete,change,post,patch or put"""

#     def has_permission(self, request, view):
#         if request.method == "GET":
#             return request.user.is_authenticated
#         return True


class DriverListAPI(ListAPIView):
    queryset = Driver.objects.all()

    serializer_class = DriverSerializer
    pagination_class = DriverPagination
    filter_backends = (DjangoFilterBackend, SearchFilter,)
    filter_fields = ('id',)
    search_fields = ('name',)

    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)


class DriverCreateAPI(CreateAPIView):
    serializer_class = DriverSerializer

    def create(self, request, *args, **kwargs):
        name = request.data.get('name')
        salary = request.data.get('salary')
        route = request.data.get('route')

        try:
            if float(salary) > 10000.00:
                raise ValidationError(
                    {'price': 'Should not be above 9,999'})
            elif float(salary) <= 0.00:
                raise ValidationError(
                    {'price': 'Should not be less than 2, 000'})
        except ValueError:
            raise ValidationError({'price': 'price should be number'})

        return super().create(request, *args, **kwargs)

    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)


class DriverRetrieveUpdateDestroyAPI (RetrieveUpdateDestroyAPIView):
    serializer_class = DriverSerializer
    queryset = Driver.objects.all()
    lookup_field = ('id')

    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)


class UserListCreateApiView(ListCreateAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer
