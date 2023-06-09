# Generated by Django 3.2.13 on 2023-05-25 22:53

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False, unique=True)),
                ('title', models.CharField(max_length=100)),
                ('overview', models.TextField(null=True)),
                ('poster_path', models.TextField(null=True)),
                ('release_date', models.TextField(null=True)),
                ('genres', models.JSONField(default=list, null=True)),
                ('vote_average', models.DecimalField(decimal_places=3, max_digits=6, null=True)),
                ('runtime', models.IntegerField(null=True)),
                ('updated_at', models.DateField(auto_now=True)),
                ('videos', models.JSONField(default=list, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('content', models.TextField()),
                ('score', models.IntegerField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('movie', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='movies.movie')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
