import json

from .models import Item
from django.http import FileResponse
from rest_framework import permissions

from .serializers import ItemSerializer
from rest_framework.generics import RetrieveUpdateAPIView
from neural_network import model_weights
from django.core.files.storage import default_storage
import base64

from rest_framework.decorators import action
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework import status


#class ItemViewSet(RetrieveUpdateAPIView):
#    queryset = Item.objects.all().order_by('id')
#    serializer_class = ItemSerializer
#    permission_classes = [permissions.AllowAny]
#    neural_controller = model_weights.Controller()
#
#    #@action(detail=False, methods=['post'])
#    def post(self, request):
#        file = request.FILES['file']
#        file_name = default_storage.save(file.name, file)
#        res = self.neural_controller.predict(file_name)
#        result_track = 'Dataset\\tracks\\' + res[0][0] + '.mp3' # song name
#        print("result_track = ", result_track)
#        
#        with open(result_track, 'rb') as f:
#            file_data = base64.b64encode(f.read()).decode('utf-8')
#        return FileResponse(file_data)


class ItemViewSet(CreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [permissions.AllowAny]
    neural_controller = model_weights.Controller()

    def post(self, serializer):
        file = self.request.FILES['file']
        file_name = default_storage.save(file.name, file)
        res = self.neural_controller.predict(file_name)

        base = '/app/neural/Dataset/tracks/'

        response = []
        best_files = res[:5]
        for best_file in best_files:
            filename, probability = best_file
            filepath = f"{base}{filename}.mp3"
            with open(filepath, 'rb') as f:
                filedata = base64.b64encode(f.read()).decode('utf-8')
                response.append({
                    "name": filename,
                    "probability": probability,
                    "filedata": filedata
                })

        return Response(response, status=status.HTTP_200_OK)
