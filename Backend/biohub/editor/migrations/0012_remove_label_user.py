# -*- coding: utf-8 -*-
# Generated by Django 1.11.15 on 2018-10-06 00:59
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('editor', '0011_auto_20181001_2241'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='label',
            name='user',
        ),
    ]
