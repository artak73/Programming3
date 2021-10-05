var LivingCreature = require("./parentClass/livingCreature.js");
var random = require("./random");
module.exports = class Aliens extends LivingCreature{
    constructor(x, y, energy) {
        super(x, y, energy);
        this.multiply = 0;
    }

    chooseCell(ch) {
        return super.chooseCell(ch);
    }
    mul() {
        this.multiply++;
        let arr = this.chooseCell(0);
        let emptyCell = random(arr);
        if (this.multiply >= 3 && emptyCell) {
            let x = emptyCell[0];
            let y = emptyCell[1];
            if (x >= 0 && y >= 0 && x <= matrix.length - 1 && y <= matrix.length - 1) {
                matrix[y][x] = 5;
                let al = new Aliens(x, y, 20); 
                AliensArr.push(al);
                this.multiply = 0;
                aliensCountB++;
            }
        }
    }
    die() {
        for (let i in AliensArr) {
            if (AliensArr[i].x == this.x && AliensArr[i].y == this.y) {
                AliensArr.splice(i, 1);
            }
        }
        matrix[this.y][this.x] = 0;
    }
    act() {
        this.energy -= 3;
        this.mul();
        if (this.energy <= 0) {
            this.die();
        }
    }
}