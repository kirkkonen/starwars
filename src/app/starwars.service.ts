import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StarwarsService {

  private characters = [
    { name: 'Luke Skywalker', side: ''},
    { name: 'Darth Vader', side: '' },
    { name: 'Princess Leia', side: ''},
    { name: 'R2D2', side: ''}
  ];

  getCharacters(chosenList) {
    if (chosenList === 'all') {
      return this.characters.slice();
    }

    return this.characters.filter((char) => {
      return char.side === chosenList;
    });
  }

  onSideChosen(charInfo) {
    const pos = this.characters.findIndex((char) => {
      return char.name === charInfo.name;
    });
    this.characters[pos].side = charInfo.side;
  }
}
