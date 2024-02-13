from rest_framework import serializers

from .models import Item


class ItemSerializer(serializers.ModelSerializer):
    """ Сериализация регистрации пользователя и создания нового. """

    # Убедитесь, что пароль содержит не менее 8 символов, не более 128,
    # и так же что он не может быть прочитан клиентской стороной
    name = serializers.CharField(
        max_length=128,
        min_length=2
    )

    class Meta:
        model = Item
        # Перечислить все поля, которые могут быть включены в запрос
        # или ответ, включая поля, явно указанные выше.
        fields = ['name', 'username', 'created']

    def create(self, validated_data):
        return Item.objects.create(**validated_data)
