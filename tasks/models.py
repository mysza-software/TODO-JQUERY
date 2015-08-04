from django.db import models
import hashlib

# Create your models here.


class User(models.Model):
	userId = models.AutoField(primary_key=True)
	userLogin = models.CharField(max_length=20)
	userPassword = models.CharField(max_length=32)

	def __str__(self):
		return self.userLogin
	
	def checkPassword(self,password):
		return createHash(password)==userPassword

	def createHash(self,x):
	    hash = hashlib.md5()
	    hash.update(str(x))
	    return  hash.hexdigest()

	def completedCount(self):
		return len(self.task_set.filter(isCompleted=True))

	def incompleteCount(self):
		return len(self.task_set.filter(isCompleted=False))

class Task(models.Model):
	tasksUser = models.ForeignKey(User)
	taskId = models.AutoField(primary_key=True)
	taskName = models.CharField(max_length=50)
	isCompleted = models.BooleanField()

	def __str__(self):
		return self.taskName
