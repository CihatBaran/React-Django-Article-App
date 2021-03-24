from api.models import Article
from api.serializers import ArticleSerializer

from rest_framework.generics import ListAPIView
from rest_framework.generics import CreateAPIView
from rest_framework.generics import ListCreateAPIView
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.filters import SearchFilter
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import BasePermission
from django_filters.rest_framework import DjangoFilterBackend


class OnlyForGetPermission(BasePermission):
    """This ensures that only authenticated user can delete,change,post,patch or put"""

    def has_permission(self, request, view):
        if request.method == "GET":
            return True
        return request.user.is_authenticated


class ArticlePagination(LimitOffsetPagination):
    default_limit = 10
    max_limit = 10


class ArticleListCreateApiView(ListCreateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    pagination_class = ArticlePagination

    filter_backends = (DjangoFilterBackend, SearchFilter,)
    filter_fields = ('id',)
    search_fields = ('title',)

    authentication_classes = (TokenAuthentication,)
    permission_classes = (OnlyForGetPermission,)


class ArticleRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.all()
    lookup_field = 'id'
    serializer_class = ArticleSerializer

    authentication_classes = (TokenAuthentication,)
    permission_classes = (OnlyForGetPermission,)
