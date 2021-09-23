var LivingCreature = require("./parentClass/livingCreature.js");
var random = require("./parentClass/random.js");
module.exports = class GrassEather extends LivingCreature{
    constructor(x, y, index){
        super(x, y, index);
        this.energy = 5;
    }


    updateDirection() {
        super.updateDirection();
    }

    chooseCell(character) {
        this.updateDirection();
        return super.chooseCell(character);
    }


    move() {
        this.energy--;
        let arr = this.chooseCell(1);
        if (arr.length > 0) {
            this.eat();
        }else if(this.energy <= 4){
            arr = this.chooseCell(0);
            let emptyCell = random(arr);
            if (emptyCell) {
                let x = emptyCell[0];
                let y = emptyCell[1];

                matrix[y][x] = 2;
                matrix[this.y][this.x] = 0;

                this.x = x;
                this.y = y;
            }
        }

        if (this.energy >= 15) {
            this.mul();
        }
        if (this.energy <= 0) {
            this.die();
        }
    }
    eat() {
        var newCell = random(this.chooseCell(1));
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 2;

            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }

            this.y = newY;
            this.x = newX;
            this.energy += 20;
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in grassEatherArr) {
            if (this.x == grassEatherArr[i].x && this.y == grassEatherArr[i].y) {
                grassEatherArr.splice(i, 1);
                break;
            }
        }
    }

    mul() {
        var newCell = random(this.chooseCell(0));
        if (this.energy >= 15 && newCell) {
            var newGrassEater = new GrassEather(newCell[0], newCell[1]);
            grassEatherArr.push(newGrassEater);
            matrix[newCell[1]][newCell[0]] = 2;
            this.energy = 8;
        }
    }

}