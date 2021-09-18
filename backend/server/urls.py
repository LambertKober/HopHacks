"""server URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from server.views.ca import CACreate, CAItem
from server.views.schedule import ScheduleItem, ScheduleList
from server.views.session import SessionItem, SessionItemState, SessionList

urlpatterns = [
    path('admin/', admin.site.urls),
    path('cas/', CACreate),
    path('cas/<str>:ca_id', CAItem),
    path('schedule/', ScheduleList),
    path('schedule/<str:schedule_id>', ScheduleItem),
    path('students/', ScheduleList),
    path('students/<str:selection_id>', ScheduleItem),
    path('session/', SessionList),
    # path('session/<str:sess_id>/state', SessionItemState),
    path('session/<str:sess_id>', SessionItem),
]
