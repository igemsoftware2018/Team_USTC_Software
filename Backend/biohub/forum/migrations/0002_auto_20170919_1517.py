# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-09-19 07:17
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('forum', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='experience',
            name='pub_time',
            field=models.DateTimeField(auto_now_add=True, verbose_name='publish time'),
        ),
    ]