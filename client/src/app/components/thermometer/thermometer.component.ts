import { Component, OnInit, Input } from '@angular/core';
import { Popularity } from 'src/app/data/popularity';

@Component({
    selector: 'app-thermometer',
    templateUrl: './thermometer.component.html',
    styleUrls: ['./thermometer.component.css'],
    standalone: false
})
export class ThermometerComponent implements OnInit {
  //The popularity to display (holds the percent and the color for the bar)
  @Input() popularity:Popularity;
  //The text shown in front of the percent
  @Input() label:string = 'Popularity';

  constructor() { }

  ngOnInit() {
  }

}
