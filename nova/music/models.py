from django.db import models
from datetime import datetime, timedelta
# Create your models here.

class Artist(models.Model):
    stage_name = models.CharField(max_length=200)
    image = models.ImageField(upload_to="profile",default="profile/no-img.png")
    thumbnail_image = models.ImageField(upload_to="thumbnail",default="thumbnail/no-thumbnail-img.png")

    class Meta:
        verbose_name_plural = "Artists"

    def __str__(self):
        return str(self.stage_name)

class Album(models.Model):
    uploader = models.ForeignKey('accounts.CustomUser', on_delete=models.CASCADE)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
    album_art = models.ImageField(upload_to="album_art", blank=True, null=True)
    album_name = models.CharField(max_length=200)
    upload_date = models.DateField(default=datetime.now)

    class Meta:
        verbose_name_plural = "Albums"

    def __str__(self):
        return str(self.album_name) + " | by " + str(self.artist)

class Song(models.Model):
    uploader = models.ForeignKey('accounts.CustomUser', on_delete=models.CASCADE)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
    album = models.ForeignKey(Album, on_delete=models.CASCADE, blank=True, null=True)
    song_file = models.FileField(upload_to="song_files")
    track_art = models.ImageField(upload_to="single_art")
    peaks_file = models.FileField(upload_to="peaks")
    track_art_dominant_color = models.CharField(max_length=6, default='ffffff')
    song_duration_seconds = models.PositiveIntegerField("Track duration in seconds", blank=True, null=True)
    song_name = models.CharField(max_length=100)
    upload_date = models.DateField(default=datetime.now)

    class Meta:
        verbose_name_plural = "Songs"

    def __str__(self):
        return str(self.song_name) + " | by " + str(self.artist)