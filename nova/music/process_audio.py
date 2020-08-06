import os
import sys
os.environ['DJANGO_SETTINGS_MODULE'] = 'nova.settings'

# Since feeder.py is in Dashboard_app, you need to add the parent directory
# to the python path so that dashex can be imported
# (without this you'll get the 'no module named dashex' error)
sys.path.append('..')

import django
django.setup()

import eyed3
from mutagen import File
import glob
import uuid
from music.models import Album, Artist, Song

all_files = glob.glob("../unprocessed_audio/*.mp3")

for song_file in all_files:
    audiofile = eyed3.load(song_file)
    file = File(song_file) # mutagen can automatically detect format and type of tags
    album = audiofile.tag.album
    title = audiofile.tag.title
    artist = audiofile.tag.artist
    artwork = file.tags['APIC:'].data
    id = "../single_art/" + str(uuid.uuid1()) 
    with open(id + ".jpg", 'wb') as img:
       img.write(artwork)
    art_file = id+".jpg"

    # Lookup if the artist exists
    artist_match = Artist.objects.filter(stage_name=artist)
    artist_obj = ""
    if artist_match:
        artist_obj = Artist.objects.get(stage_name=artist)
    else:
        artist_obj = Artist(stage_name=artist)
        artist_obj.save()

    # Lookup if the album exists
    album_match = Album.objects.filter(album_name=album, artist=artist_obj)
    album_obj = ""
    if album_match:
        album_obj = Album.objects.get(album_name=album, artist=artist_obj)
    else:
        album_obj = Album(album_name=album, artist=artist_obj, uploader_id=1)
        album_obj.save()

    # Lookup if the song exists
    song_match = Song.objects.filter(song_name=title, artist=artist_obj)
    song_obj = ""
    if song_match:
        song_obj = Song.objects.get(song_name=title, artist=artist_obj)
    else:
        song_obj = Song(song_file=song_file, track_art=art_file, uploader_id=1, song_name=title, artist=artist_obj, album=album_obj)
        song_obj.save()


