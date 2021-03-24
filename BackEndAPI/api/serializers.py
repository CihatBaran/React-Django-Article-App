from api.models import Article

from rest_framework import serializers


class ArticleSerializer(serializers.ModelSerializer):

    length_title = serializers.SerializerMethodField()

    class Meta:
        model = Article
        fields = ('id', 'title', 'description', 'length_title')

    def get_length_title(self, instance):
        if len(instance.title) < 50:
            return "Short"
        return "Long"


# class BookSerializer(serializers.ModelSerializer):
#     articles = ArticleSerializer(many=True)

#     class Meta:
#         model = Book
#         fields = ('id', 'name', 'genre', 'price', 'articles',
#                   'date', 'author')
