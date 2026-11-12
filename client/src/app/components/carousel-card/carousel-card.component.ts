import { Component, OnInit, Input } from '@angular/core';
import { ResourceData } from '../../data/resource-data';

@Component({
    selector: 'app-carousel-card',
    templateUrl: './carousel-card.component.html',
    styleUrls: ['./carousel-card.component.css'],
    standalone: false
})
export class CarouselCardComponent implements OnInit {
  @Input() resource:ResourceData;

  constructor() { }

  ngOnInit() {
  }

  //The local page for this resource. The routes in app-routing.module.ts are
  //artist/:id, album/:id, and track/:id, which match each resource's category.
  get localUrl():string {
    return '/' + this.resource.category + '/' + this.resource.id;
  }

}
