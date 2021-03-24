from api.models import Article
from api.serializers import ArticleSerializer

from rest_framework.generics import ListAPIView
from rest_framework.generics import CreateAPIView
from rest_framework.generics import ListCreateAPIView
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend


class ArticlePagination(LimitOffsetPagination):
    default_limit = 10
    max_limit = 10


class ArticleListApiView(ListCreateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    pagination_class = ArticlePagination
    filter_backends = (DjangoFilterBackend, SearchFilter,)
    filter_fields = ('id',)
    search_fields = ('title',)


class ArticleRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.all()
    lookup_field = 'id'
    serializer_class = ArticleSerializer
