import { Injectable } from '@angular/core';
import { LogService } from './log.service';
import { Subject } from 'rxjs';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()

export class StarwarsService {

  private characters = [
    { name: 'Luke Skywalker', side: ''},
    { name: 'Darth Vader', side: '' },
    { name: 'Princess Leia', side: ''},
    { name: 'R2D2', side: ''}
  ];

  private logService: LogService;
  characterChanged = new Subject<void>();
  http: Http;

  constructor(logService: LogService, http: Http) {
    this.logService = logService;
    this.http = http;
  }

  fetchCharacters() {
    this.http.get('https://swapi.co/api/people/')
    .map((response: Response) => {
      const data = response.json();
      const extractedChars = data.results;
      const modifiedChars = extractedChars.map((modifiedChar) => {
        return {name: modifiedChar.name, side: ''};
      });
      return modifiedChars;
    })
    .subscribe(
      (data) => {
        console.log(data);
        this.characters = data;
        this.characterChanged.next();
      }
    );
  }

  getCharacters(chosenList) {
    if (chosenList === 'all') {
      return this.characters.slice();
    }
    return this.characters.filter((item) => {
      return item.side === chosenList;
    });
  }

  onSideChosen(charInfo) {
    const position: number = this.characters.findIndex((item2) => {
      return item2.name === charInfo.name;
    });
    this.characters[position].side = charInfo.side;
    this.characterChanged.next();
    this.logService.writeLog('Changed side of ' + charInfo.name + ', new side: ' + charInfo.side);
  }

  addCharacter(name, side) {
    const position = this.characters.findIndex((item3) => {
      return item3.name === name;
    })
    if (position !== -1) {
      return;
    }
    const newChar = {name: name, side: side};
    this.characters.push(newChar);
  }
}
