from django.urls import path
from rest_framework import routers

from .views import ItemViewSet

router = routers.DefaultRouter()
app_name = 'neural'
# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('recomendation', ItemViewSet.as_view()),
]

urlpatterns += router.urls
