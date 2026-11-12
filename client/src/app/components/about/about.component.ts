import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css'],
    standalone: false
})
export class AboutComponent implements OnInit {
  name:string = null;
  profile_pic:string = "assets/unknown.jpg";
  profile_link:string = null;


  //Inject the Spotify service so this component can ask Express for data
  constructor(private spotifyService:SpotifyService) { }

  ngOnInit() {
  }

  //Called when the "Load info about me" button is clicked.
  //Gets the "about me" information from Spotify and updates the fields the template is bound to.
  //(An arrow function is used so that "this" still refers to the component inside the callback.)
  loadAboutMe() {
    this.spotifyService.aboutMe().then((profile) => {
      this.name = profile.name;
      this.profile_pic = profile.imageURL;
      this.profile_link = profile.spotifyProfile;
    });
  }

}
