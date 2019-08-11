import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { StarwarsService } from '../starwars.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {

  characters = [];
  activatedRoute: ActivatedRoute;
  swService: StarwarsService;
  loadedSide = "all";
  subscription: Subscription;

  constructor(activatedRoute: ActivatedRoute, swService: StarwarsService) {
    this.activatedRoute = activatedRoute;
    this.swService = swService;
   }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params) => {
        this.characters = this.swService.getCharacters(params.side);
        this.loadedSide = params.side;
      }
    );
    this.subscription = this.swService.characterChanged.subscribe(
      () => {
        this.characters = this.swService.getCharacters(this.loadedSide);
      }
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
