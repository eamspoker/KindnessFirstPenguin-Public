from rest_framework import serializers
from .models import ChromeUser

class ChromeUserSerializer(serializers.ModelSerializer):    
    class Meta:
        model = ChromeUser
        fields = ('__all__')

    def create(self, validated_data):
        return ChromeUser.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.email = validated_data.get('email',instance.email)
        instance.text = validated_data.get('text',instance.text)
        instance.save()
        return instance