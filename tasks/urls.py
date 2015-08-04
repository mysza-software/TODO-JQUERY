from django.conf.urls import url

import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^login$', views.login, name='login'),
    url(r'^logout$', views.logout, name='logout'),
    url(r'^gettasks$', views.getTasks, name='gettasks'),
    url(r'^savetasks$', views.saveTasks, name='gettasks'),
]
