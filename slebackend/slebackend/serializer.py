from rest_framework import serializers
from .models import SLE

class SLEserializer(serializers.ModelSerializer):
    class Meta:
        model = SLE
        fields = [
            "id",
            "name",
            "company",
            "email",
            "status"
        ]