import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ArtistData } from '../../data/artist-data';
import { AlbumData } from '../../data/album-data';
import { TrackData } from '../../data/track-data';
import { ResourceData } from '../../data/resource-data';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css'],
    providers: [SpotifyService],
    standalone: false
})
export class SearchComponent implements OnInit {
  searchString:string;
  searchCategory:string = 'artist';
  searchCategories:string[] = ['artist', 'album', 'track'];
  resources:ResourceData[];
  //The category the current results belong to. Kept separately from searchCategory so that
  //changing the dropdown doesn't try to show (for example) artists in the track list.
  resultCategory:string;

  constructor(private spotifyService:SpotifyService) { }

  ngOnInit() {
  }

  search() {
    //Nothing to search for if the box is empty
    if(!this.searchString || this.searchString.trim() == '') {
      return;
    }

    //Remember which category this search is for, in case the dropdown changes before results arrive
    var category:string = this.searchCategory;

    //Clear the old results first so the carousel/track list is rebuilt from scratch for the new results
    this.resources = undefined;

    this.spotifyService.searchFor(category, this.searchString).then((results) => {
      this.resultCategory = category;
      this.resources = results;
    });
  }

  //The results as tracks, for binding to the track-list component
  get tracks():TrackData[] {
    return this.resources as TrackData[];
  }

}
