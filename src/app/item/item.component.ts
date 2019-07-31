import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StarwarsService } from '../starwars.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input() character;
  @Output() sideAssigned = new EventEmitter<{name: string, side: string}>();
  swService: StarwarsService;

  constructor(swService: StarwarsService) {
    this.swService = swService;
   }

  ngOnInit() {
  }

  onAssign(side) {
    // this.character.side = side;
    // this.sideAssigned.emit({name: this.character.name, side: side});
    this.swService.onSideChosen({ name: this.character.name, side: side});
  }

}
