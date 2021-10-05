var LivingCreature = require("./parentClass/livingCreature.js");
var random = require("./random");
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
        if (weath == "winter") {
            this.energy;
        }
        if (weath == "spring") {
            this.energy--;
        }
        if (weath == "summer") {
            this.energy--;
        }
        if (weath == "autumn") {
            this.energy--;
        }
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

        this.mul();
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
            this.energy += 7;
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                break;
            }
        }
    }

    mul() {
        var newCell = random(this.chooseCell(0));
        if (this.energy >= 13 && newCell) {
            grassEaterCountB++;
            var newGrassEater = new GrassEather(newCell[0], newCell[1], 2);
            grassEaterArr.push(newGrassEater);
            matrix[newCell[1]][newCell[0]] = 2;
            this.energy = 7;
        }
    }

}