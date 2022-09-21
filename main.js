const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field){
    
    this.field = field;
    this.x=0;
    this.y=0;
  }
  print(){
    return this.field.map((ele)=>{
      return ele.join('')
    }).join('\n')
  }
}
const myField = new Field([
  ['*', '░', 'O','░', 'O', '░', 'O','░'],
  ['░', '░', '░','O', '░', '░', '░','O'],
  ['O', 'O', '░','░', 'O', '░', 'O','░'],
  ['░', 'O', '░','^', '░', '░', 'O','░'],

]);
console.log(myField.print());




