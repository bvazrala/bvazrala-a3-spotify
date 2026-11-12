import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ArtistData } from '../data/artist-data';
import { AlbumData } from '../data/album-data';
import { TrackData } from '../data/track-data';
import { ResourceData } from '../data/resource-data';
import { ProfileData } from '../data/profile-data';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
	expressBaseUrl:string = 'http://127.0.0.1:8888';

  constructor(private http:HttpClient) { }

  private sendRequestToExpress(endpoint:string):Promise<any> {
    //The full address is the Express base URL followed by the endpoint, e.g. http://127.0.0.1:8888/me
    var uri:string = this.expressBaseUrl + endpoint;

    //firstValueFrom generates a Promise for whatever is returned first from the GET request.
    //You shouldn't need to update this part.
    return firstValueFrom(this.http.get(uri)).then((response) => {
      return response;
    }, (err) => {
      return err;
    });
  }

  //Spotify wraps lists in an object (e.g. {items: [...]} or {tracks: [...]}).
  //This pulls the list out, and skips any empty (null) entries so the data classes don't crash on them.
  private extractList(data:any, key:string):any[] {
    var list:any[] = [];
    if(Array.isArray(data)) {
      list = data;
    } else if(data && Array.isArray(data[key])) {
      list = data[key];
    } else if(data && Array.isArray(data['items'])) {
      list = data['items'];
    }
    return list.filter((item) => item != null);
  }

  aboutMe():Promise<ProfileData> {
    //This line is sending a request to express, which returns a promise with some data. We're then parsing the data 
    return this.sendRequestToExpress('/me').then((data) => {
      return new ProfileData(data);
    });
  }

  searchFor(category:string, resource:string):Promise<ResourceData[]> {
    //The Express endpoint is /search/:category/:resource (see webserver/routes/index.js).
    //encodeURIComponent makes spaces and special characters safe to put in a URL.
    return this.sendRequestToExpress('/search/' + category + '/' + encodeURIComponent(resource)).then((data) => {
      //Spotify returns results under the plural of the category: data.artists.items, data.albums.items, or data.tracks.items
      var items:any[] = this.extractList(data[category + 's'], 'items');

      //Create the right type of data object for each result, depending on the category searched for
      if(category == 'artist') {
        return items.map((artist) => new ArtistData(artist));
      } else if(category == 'album') {
        return items.map((album) => new AlbumData(album));
      } else {
        return items.map((track) => new TrackData(track));
      }
    });
  }

  getArtist(artistId:string):Promise<ArtistData> {
    //Express endpoint: /artist/:id
    return this.sendRequestToExpress('/artist/' + encodeURIComponent(artistId)).then((data) => {
      return new ArtistData(data);
    });
  }

  getTopTracksForArtist(artistId:string):Promise<TrackData[]> {
    //Express endpoint: /artist-top-tracks/:id, which returns {tracks: [...]}
    return this.sendRequestToExpress('/artist-top-tracks/' + encodeURIComponent(artistId)).then((data) => {
      return this.extractList(data, 'tracks').map((track) => new TrackData(track));
    });
  }

  getAlbumsForArtist(artistId:string):Promise<AlbumData[]> {
    //Express endpoint: /artist-albums/:id, which returns {items: [...]}
    return this.sendRequestToExpress('/artist-albums/' + encodeURIComponent(artistId)).then((data) => {
      return this.extractList(data, 'items').map((album) => new AlbumData(album));
    });
  }

  getAlbum(albumId:string):Promise<AlbumData> {
    //Express endpoint: /album/:id
    return this.sendRequestToExpress('/album/' + encodeURIComponent(albumId)).then((data) => {
      return new AlbumData(data);
    });
  }

  getTracksForAlbum(albumId:string):Promise<TrackData[]> {
    //Express endpoint: /album-tracks/:id, which returns {items: [...]}
    return this.sendRequestToExpress('/album-tracks/' + encodeURIComponent(albumId)).then((data) => {
      return this.extractList(data, 'items').map((track) => new TrackData(track));
    });
  }

  getTrack(trackId:string):Promise<TrackData> {
    //Express endpoint: /track/:id
    return this.sendRequestToExpress('/track/' + encodeURIComponent(trackId)).then((data) => {
      return new TrackData(data);
    });
  }
}
