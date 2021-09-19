var LivingCreature = require("./parentClass/livingCreature.js");
module.exports = class Aliens extends LivingCreature{
    constructor(x, y, energy) {
        super(x, y);
        this.energy = energy;
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
                let al = new Aliens(x, y, 3); // ete 10 dnenq energy-n aylmolorakainnery kgraven ashxarhy "Чужой" 2bit version
                AliensArr.push(al);
                this.multiply = 0;
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
        this.energy--;
        this.mul();
        if (this.energy <= 0) {
            this.die();
        }
    }
}