from django.urls import path
from .views import (
    ChromeUserApiView
)

urlpatterns = [
    path('', ChromeUserApiView.as_view()),
]