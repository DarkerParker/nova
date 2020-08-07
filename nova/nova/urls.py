"""nova URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.contrib.staticfiles.urls import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from . import settings

from music.models import Song, Artist, Album
from rest_framework import routers, serializers, viewsets

# Serializers define the API representation.
class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = ['stage_name']

# ViewSets define the view behavior.
class ArtistViewSet(viewsets.ModelViewSet):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer

# Serializers define the API representation.
class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = ['album_name']

# ViewSets define the view behavior.
class AlbumViewSet(viewsets.ModelViewSet):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer

# Serializers define the API representation.
class SongSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = ['artist', 'song_file', 'track_art', 'song_name', 'song_duration_seconds']

# ViewSets define the view behavior.
class SongViewSet(viewsets.ModelViewSet):
    queryset = Song.objects.all()
    serializer_class = SongSerializer

# Serializers define the API representation.
class SongArtistSerializer(serializers.ModelSerializer):
    artist = ArtistSerializer()
    class Meta:
        model = Song
        fields = ['id','artist', 'song_file', 'track_art', 'song_name', 'song_duration_seconds']

# ViewSets define the view behavior.
class SongArtistViewSet(viewsets.ModelViewSet):
    queryset = Song.objects.all()
    serializer_class = SongArtistSerializer

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'songs', SongViewSet)
router.register(r'artists', ArtistViewSet)
router.register(r'albums', AlbumViewSet)
router.register(r'song-artist', SongArtistViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls'))
]

urlpatterns += staticfiles_urlpatterns()
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)