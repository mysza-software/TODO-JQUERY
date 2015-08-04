# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Tasks',
            fields=[
                ('taskId', models.AutoField(serialize=False, primary_key=True)),
                ('taskName', models.CharField(max_length=50)),
                ('isCompleted', models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('userId', models.AutoField(serialize=False, primary_key=True)),
                ('userLogin', models.CharField(max_length=20)),
                ('userPassword', models.CharField(max_length=32)),
            ],
        ),
        migrations.AddField(
            model_name='tasks',
            name='tasksUser',
            field=models.ForeignKey(to='tasks.User'),
        ),
    ]
