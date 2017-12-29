from django.conf.urls import url
from django.contrib import admin

from network import views

urlpatterns = [
    url(r'$^', views.IndexView.as_view()),
    url(r'^admin/', admin.site.urls),
]
