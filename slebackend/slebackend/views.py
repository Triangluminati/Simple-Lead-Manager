from rest_framework import viewsets
from .models import SLE
from .serializer import SLEserializer



class SLEviewset(viewsets.ModelViewSet):
    # drf has basic crud built in so instead of writing ~40 lines of code
    # it can be compressed into this
    queryset = SLE.objects.all()
    serializer_class = SLEserializer
    def list(self, request, *args, **kwargs):
        return super().list(
            request,
            *args,
            **kwargs
        )
    