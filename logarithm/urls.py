from django.conf.urls import url
from django.contrib import admin

from network import views

urlpatterns = [
    url(r'^$', views.IndexView.as_view(), name="index"),
    url(r'register/$', views.RegisterView.as_view(), name="register"),
    url(r'login/$', views.LoginView.as_view(), name="login"),
    url(r'logout/$', views.LogoutView.as_view(), name="logout"),
    url(r'^admin/', admin.site.urls),
]
