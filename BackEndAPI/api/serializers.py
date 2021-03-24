from api.models import Article
from django.contrib.auth import get_user_model

from rest_framework import serializers
from rest_framework.authtoken.views import Token


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


class ArticleSerializer(serializers.ModelSerializer):

    length_title = serializers.SerializerMethodField()

    author = serializers.SerializerMethodField()

    class Meta:
        model = Article
        fields = ('id', 'title', 'description', 'length_title', 'author')

    def get_length_title(self, instance):
        if len(instance.title) < 50:
            return "Short"
        return "Long"

    def get_author(self, instance):
        return instance.author.username
