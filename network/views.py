from django.shortcuts import render, redirect
from django.views import generic

from django.urls import reverse_lazy, reverse
from django.utils.decorators import method_decorator
from django.views.decorators.cache import never_cache
from django.views.decorators.csrf import csrf_protect
from django.views.decorators.debug import sensitive_post_parameters
from django.contrib.auth import authenticate, login, logout, get_user_model
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm

class IndexView(generic.TemplateView):
    template_name = "index.html"

    
class LoginView(generic.FormView):
  template_name = "login.html"
  form_class = AuthenticationForm
  success_url = "/"

  @method_decorator(sensitive_post_parameters('password'))
  @method_decorator(csrf_protect)
  @method_decorator(never_cache)
  def dispatch(self, request, *args, **kwargs):
    if request.user.is_authenticated():
      return redirect("index")
    else:
      request.session.set_test_cookie()

      return super(LoginView, self).dispatch(request, *args, **kwargs)

  def form_valid(self, form):
    login(self.request, form.get_user())

    if self.request.session.test_cookie_worked():
      self.request.session.delete_test_cookie()

    return super(LoginView, self).form_valid(form)


class LogoutView(generic.RedirectView):
  url = "/"

  def get(self, request, *args, **kwargs):
    logout(request)
    return super(LogoutView, self).get(request, *args, **kwargs)


class RegisterView(generic.CreateView):
  template_name = "register.html"
  form_class = UserCreationForm
  success_url = "/login/"

