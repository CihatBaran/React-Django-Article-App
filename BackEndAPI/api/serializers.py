from api.models import Article
from django.contrib.auth import get_user_model

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


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        style={'input_type': 'password', 'placeholder': 'Password'},
        trim_whitespace=False)

    class Meta:
        model = get_user_model()
        fields = ('id', 'username', 'password')
