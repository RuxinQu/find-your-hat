const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(obj) {
    this.field = obj.field;
    this.x = obj.pathLocation.pathX;
    this.y = obj.pathLocation.pathY;
    this.playing = true;
  }

  print() {
    console.log(this.field.map((ele) => {
      return ele.join('')
    }).join('\n')
    )
  }


  locatePathCharacter() {
    return this.field[this.y][this.x] = pathCharacter;
  }

  isHat() {
    return this.field[this.y][this.x] == hat;
  }

  isHole() {
    return this.field[this.y][this.x] == hole;
  }

  isOutside() {
    return this.x < 0 || this.y < 0 || this.y > this.field.length || this.x > this.field[0].length;
  }

  askQuestions() {
    const move = prompt('which way would you like to move? (u means up, d means down, l means left and r means right)').toLowerCase();
    if (move === 'd') {
      return this.y++;
    } else if (move === 'u') {
      return this.y--;
    } else if (move === 'l') {
      return this.x--;
    } else if (move === 'r') {
      return this.x++;
    }
  }

  // check isOutside first since the code runs in order, otherwise it will cause an error 
  checkLocation() {
    if (this.isOutside()) {
      console.log('Game Over! You\'re outside of the field!');
      this.playing = false;
    } else if (this.isHole()) {
      console.log('Game Over! You dropped in a hole!');
      this.playing = false;
    } else if (this.isHat()) {
      console.log('Congratulation! You found the hat!');
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

  static generateField(length, width, percentage = 0.1) {
    // generate a two demention array filled with holes and count the hole number
    const field = Array(length).fill(null).map(() => Array(width));
    let holeNum = 0;
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < length; y++) {
        field[y][x] = hole;
        holeNum++;
      }
    }

    // create an object for hatlocation if the location is [0][0] keep generating until it's not
    const hatLocation = {
      hatX: Math.floor(Math.random() * width),
      hatY: Math.floor(Math.random() * length)
    }
    while (hatLocation.hatX === 0 && hatLocation.hatY === 0) {
      hatLocation.hatX = Math.floor(Math.random() * width);
      hatLocation.hatY = Math.floor(Math.random() * length);
    }
    // create an object for pathcharactor location and make sure it's not the same with hatlocation
    const pathLocation = {
      pathX: Math.floor(Math.random() * width),
      pathY: Math.floor(Math.random() * length)
    }
    while (pathLocation.pathX === hatLocation.hatX && pathLocation.pathY === hatLocation.hatY) {
      pathLocation.pathX = Math.floor(Math.random() * width);
      pathLocation.pathY = Math.floor(Math.random() * length);
    }

    //take the hat and pathcharactor into account, the holenum shouldn't exceed the percentage
    while (holeNum - 2 > width * length * percentage) {
      const randomX = Math.floor(Math.random() * width);
      const randomY = Math.floor(Math.random() * length);
      field[randomY][randomX] = fieldCharacter;
      holeNum--;
    }

    field[hatLocation.hatY][hatLocation.hatX] = hat;
    field[pathLocation.pathY][pathLocation.pathX] = pathCharacter;
    // field[0][0] = pathCharacter;
    
    return {field, pathLocation};
  }
}
const myField = new Field(Field.generateField(10, 10, 0.1))


myField.gameStart();



