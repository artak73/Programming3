var LivingCreature = require("./parentClass/livingCreature.js");
var random = require("./random");
const canvasSide = 50;
module.exports = class MeatEather extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.multiply = 0;
        this.energy = 3;
    }
    updateDirection() {
        super.updateDirection();
    }
    chooseCell(ch) {
        this.updateDirection()
        return super.chooseCell(ch);
    }
    move() {
        this.energy--;
        if (weath != "winter") {
            let arr = this.chooseCell(2);
            if (arr.length > 0) {
                this.eat();
            } else {
                let arr = this.direction;
                let emptyCell = random(arr);
                if (emptyCell[0] == canvasSide) {
                    emptyCell[0]--;
                } else if (emptyCell[0] <= 0) {
                    emptyCell[0]++;
                }
                if (emptyCell[1] == canvasSide) {
                    emptyCell[1]--;
                } else if (emptyCell[1] <= 0) {
                    emptyCell[1]++;
                }
                if (matrix[emptyCell[1]][emptyCell[0]] == 0) {

                    let x = emptyCell[0];
                    let y = emptyCell[1];

                    matrix[y][x] = 3;
                    matrix[this.y][this.x] = 0;

                    this.x = x;
                    this.y = y;
                } else if (matrix[emptyCell[1]][emptyCell[0]] == 1) {
                    var newX = emptyCell[0];
                    var newY = emptyCell[1];
                    matrix[this.y][this.x] = 0;
                    matrix[newY][newX] = 3;
                    this.y = newY;
                    this.x = newX;
                    for (var i in grassArr) {
                        if (newX == grassArr[i].x && newY == grassArr[i].y) {
                            grassArr.splice(i, 1);
                            break;
                        }
                    }

                }

            }
        }
        if (weath == "winter") {
            this.energy++;
        } else if (weath == "spring") {
            this.energy++;
            this.multiply += 2;
        } else if (weath == "summer") {
            this.multiply -= 2;
            this.energy--;
        } else if (weath == "autumn") {
            this.energy++;
            this.multiply -=2;
        }
        if(weath != "winter"){
            this.mul();
               
        }
        if (this.energy <= 0) {
            this.die();
        } 

        
    }
    eat() {
        var newCell = random(this.chooseCell(2));
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 3;
            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
            this.y = newY;
            this.x = newX;
            this.energy += 3;
            this.multiply += 4;
        }
    }
    die() {
        matrix[this.y][this.x] = 0
        for (var i in meatEatherArr) {
            if (this.x == meatEatherArr[i].x && this.y == meatEatherArr[i].y) {
                meatEatherArr.splice(i, 1)
                break;
            }
        }
    }
    mul() {
        var newCell = random(this.chooseCell(0));
        if (this.multiply >= 7 && newCell) {
            meatEaterCountB++;
            var meatEater = new MeatEather(newCell[0], newCell[1]);
            meatEatherArr.push(meatEater);
            matrix[newCell[1]][newCell[0]] = 3;
            this.multiply = 6;
        }
    }
}