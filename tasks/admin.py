from django.contrib import admin
from django import forms
from .models import User,Task

# Register your models here.

class TaskAdmin(admin.ModelAdmin):
	list_display = ('taskName', 'tasksUser', 'isCompleted')

class TaskInline(admin.TabularInline):
	model = Task
	extra = 1

class UserAdminForm(forms.ModelForm):
	class Meta:
		widgets = {
        	        'userPassword': forms.PasswordInput(render_value = False),
	        }

	def __init__(self,*args, **kwargs):
		super(UserAdminForm, self).__init__(*args,**kwargs)

	def clean_userPassword(self):
                if self.cleaned_data['userPassword']=='':
                        return '1'
                else:
                        return self.cleaned_data['userPassword']

class UserAdmin(admin.ModelAdmin):
	list_display = ('userLogin', 'completedCount', 'incompleteCount')
	inlines = [TaskInline]
	form = UserAdminForm

	def save_model(self,request,obj,form,change):
		obj.userPassword=obj.createHash(obj.userPassword)
		obj.save()
	
admin.site.register(User,UserAdmin)
admin.site.register(Task,TaskAdmin)
