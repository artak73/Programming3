var LivingCreature = require("./parentClass/livingCreature.js");
module.exports = class Grass extends LivingCreature{
    constructor(x, y) {
        super(x, y);
        this.multiply = 0;
    }
    chooseCell(character) {
        return super.chooseCell(character);
    }


    mul() {
        this.multiply++;

        let emptyCells = this.chooseCell(0);
        let randomCell = random(emptyCells);

        if (this.multiply >= 1 && randomCell) {

            let x = randomCell[0];
            let y = randomCell[1];

            matrix[y][x] = 1;
            let gr = new Grass(x, y);
            grassArr.push(gr);
            this.multiply = 0;
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in grassArr) {
            if (this.x == grassArr[i].x && this.y == grassArr[i].y) {
                grassArr.splice(i, 1);
                break;
            }
        }
    }
    act() {
        this.energy--;
        if (this.energy <= 0) {
            this.die();
        } else {
            this.mul();
        }

    };
}