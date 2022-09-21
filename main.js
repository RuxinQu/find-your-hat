const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field) {
    this.field = field;
    this.x = 0;
    this.y = 0;
    this.playing = true;
  }

  print() {
    console.log(this.field.map((ele) => {
      return ele.join('')
    }).join('\n')
    )
  }

  locatePathCharacter() {
    return this.field[this.x][this.y] = pathCharacter;
  }

  isHat() {
    return this.field[this.x][this.y] == hat;
  }

  isHole() {
    return this.field[this.x][this.y] == hole;
  }

  isOutside() {
    return this.x < 0 || this.y < 0 || this.x > this.field.length || this.y > this.field[0].length;
  }

  askQuestions() {
    const move = prompt('which way would you like to move? (u means up, d means down, l means left and r means right)').toLowerCase();
    if (move === 'd') {
      return this.x++;
    } else if (move === 'u') {
      return this.x--;
    } else if (move === 'l') {
      return this.y--;
    } else if (move === 'r') {
      return this.y++;
    }
  }

  checkLocation() {
    if (this.isOutside()) {
      console.log('Game Over! You\'re outside of the field!');
      this.playing = false;
    } else if (this.isHole()) {
      console.log('Game Over! You dropped in a hole!');
      this.playing = false;
    } else if (this.isHat()) {
      console.log('Congratulatin! You found the hat!');
      this.playing = false;
    } else {
      this.locatePathCharacter();
    }
  }

  gameStart() {
    while (this.playing) {
      this.print();
      this.askQuestions();
      this.checkLocation();
    }
  }
}
const myField = new Field([
  ['*', '░', 'O', '░', 'O', '░', 'O', '░'],
  ['░', '░', '░', '░', '░', 'O', 'O', '░'],
  ['░', 'O', '░', '░', 'O', '░', 'O', '░'],
  ['░', 'O', '░', '^', '░', '░', 'O', '░'],

]);


myField.gameStart();


