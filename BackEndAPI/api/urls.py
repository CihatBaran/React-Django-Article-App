from api.api_views import ArticleListApiView, ArticleRetrieveUpdateDestroyAPIView

from django.urls import path

app_name = 'api'

urlpatterns = [
    path('articles', ArticleListApiView.as_view(),
         name="get_all_post_new_articles"),
    path('articles/<int:id>', ArticleRetrieveUpdateDestroyAPIView.as_view(),
         name="delete_update_get_article_from_id")
]
