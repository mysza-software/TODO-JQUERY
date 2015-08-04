# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('taskId', models.AutoField(serialize=False, primary_key=True)),
                ('taskName', models.CharField(max_length=50)),
                ('isCompleted', models.BooleanField()),
                ('tasksUser', models.ForeignKey(to='tasks.User')),
            ],
        ),
        migrations.RemoveField(
            model_name='tasks',
            name='tasksUser',
        ),
        migrations.DeleteModel(
            name='Tasks',
        ),
    ]
