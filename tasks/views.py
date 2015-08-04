from django.shortcuts import render
from .models import Task,User
from django.http import HttpResponseRedirect,HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.urlresolvers import reverse
import json

# Create your views here.

def index(request):
	if request.session.has_key('userId'):
		return render(request,'tasks/todo.html',{})
	else:
		ret = render(request,'tasks/login.html',{'msg': ( "" if not request.session.has_key('loginMsg') else request.session['loginMsg']) })
		if request.session.has_key('loginMsg'):
			ret = render(request,'tasks/login.html',{'msg':request.session['loginMsg']})
			del request.session['loginMsg']
			return ret
		else:
			return render(request,'tasks/login.html',{})

def login(request):
	if request.session.has_key('userId'):
		logout()
	try:
		if(len(User.objects.filter(userLogin=request.POST['username']))!=0):
			l = User.objects.filter(userLogin=request.POST['username'],userPassword=User().createHash(request.POST['password']))
			request.session['userId']=l[0].userId
		else:
			u=User(userLogin=request.POST['username'],userPassword=User().createHash(request.POST['password']))
			u.save()
			request.session['userId']=u.userId
	except (KeyError, User.DoesNotExist, IndexError):
		request.session['loginMsg']='Nieprawidlowy login lub haslo'
	return HttpResponseRedirect(reverse('tasks:index'))

def logout(request):
	if request.session.has_key('userId'):
		del request.session['userId']
        return HttpResponseRedirect(reverse('tasks:index'))

@csrf_exempt
def saveTasks(request):
        if not request.session.has_key('userId'):# or not request.META.get('CONTENT_TYPE')=='application/json':
                return HttpResponseRedirect(reverse('tasks:index'))
	try:
		data = json.loads(request.body)
		c=data['completed']
		i=data['incomplete']
		User.objects.get(userId=request.session['userId']).task_set.all().delete()
		for e in c:
			Task(tasksUser=User.objects.get(userId=request.session['userId']),taskName=e,isCompleted=True).save()
		for e in i:
			Task(tasksUser=User.objects.get(userId=request.session['userId']),taskName=e,isCompleted=False).save()
		return HttpResponse(json.dumps({'status':'ok'}),content_type='application/json')
	except Exception as e:
		return HttpResponse(json.dumps({'status':'error'}),content_type='application/json')

def getTasks(request):
	if not request.session.has_key('userId'):
	        return HttpResponseRedirect(reverse('tasks:index'))
	c = User.objects.get(userId=request.session['userId']).task_set.filter(isCompleted=True)
	i = User.objects.get(userId=request.session['userId']).task_set.filter(isCompleted=False)
	ret = { 'completed':[], 'incomplete':[]}
	for e in c:
		ret['completed'].append(e.taskName)
	for e in i:
		ret['incomplete'].append(e.taskName)
	return HttpResponse(json.dumps(ret), content_type="application/json")
