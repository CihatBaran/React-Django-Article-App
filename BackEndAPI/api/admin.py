from django.contrib import admin
from api.models import Article


# Register your models here.


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'description', 'author')
    list_filter = ('title',)

    class Meta:
        model = Article
