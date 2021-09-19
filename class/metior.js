var MetiorP = require("./parentClass/MetiorP.js");
module.exports = class Metior extends MetiorP{
    constructor() {
        super();
    }
    newCordinates() {
        super.newCordinates();
    }
    updateDirection() {
        super.updateDirection();
    }
    drop() {
        if (this.x == canvasSide - 1) {
            this.x -= 1;
        } else if (this.x <= 1) {
            this.x += 1;
        }
        if (this.y == canvasSide - 1) {
            this.y -= 1;
        } else if (this.y <= 1) {
            this.y += 1;
        }
        this.multiply++;
        console.log(this.multiply);
        if (this.multiply >= interval) {
            console.log(AliensArr);
            for (let i in this.direction) {
                let x = this.direction[i][0];
                let y = this.direction[i][1];
                if (x >= 0 && y >= 0 && x <= matrix.length - 1 && y <= matrix.length - 1){
                    matrix[y][x] = 4;
                    for (let g in grassArr) {
                        if (x == grassArr[g].x && y == grassArr[g].y) {
                            grassArr.splice(g, 1);
                            break;
                        }
                    }
                    for (let ge in grassEatherArr) {
                        if (x == grassEatherArr[ge].x && y == grassEatherArr[ge].y) {
                            grassEatherArr.splice(ge, 1);
                            break;
                        }
                    }
                    for (let me in meatEatherArr) {
                        if (x == meatEatherArr[me].x && y == meatEatherArr[me].y) {
                            meatEatherArr.splice(me, 1);
                            break;
                        }
                    }
                    AliensArr.push(new Aliens(x, y, dieInterval));
                }
            }
            this.multiply = 0;
            this.newCordinates();
            this.updateDirection();

        }
    }
}