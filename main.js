
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
  }
  print() {
    console.log(this.field.map((ele) => {
      return ele.join('')
    }).join('\n')
    )
  }
  gameStart() {
    this.print();
    let playing = true;
    while(playing){
      this.askQuestions();
    }
    
  }
  askQuestions(){
    const move = prompt('which way would you like to move? (u means up, d means down, l means left and r means right)').toLowerCase();
    if (move === 'd') {
      this.x++;
      this.locatePathCharacter()
      this.print()
    } else if(move==='u'){
      this.x--;
      this.locatePathCharacter();
      this.print();
    } else if(move==='l'){
      this.y --;
      this.locatePathCharacter();
      this.print();
    } else if (move === 'r'){
      this.y ++;
      this.locatePathCharacter();
      this.print();
    }
  }
  locatePathCharacter(){
    return this.field[this.x][this.y] = pathCharacter;
  }
}

const myField = new Field([
  ['*', '░', 'O', '░', 'O', '░', 'O', '░'],
  ['░', '░', '░', '░', '░', 'O', 'O', '░'],
  ['░', 'O', '░', '░', 'O', '░', 'O', '░'],
  ['░', 'O', '░', '^', '░', '░', 'O', '░'],

]);


myField.gameStart();

