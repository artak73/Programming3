var random = require("./parentClass/random.js");
var MetiorP = require("./parentClass/MetiorP.js");
module.exports = class MetiorAvatar extends MetiorP{
    constructor(){
        super();
    }
    newCordinates() {
        super.newCordinates();
    }
    updateDirection() {
        super.updateDirection();
    }
    drop(index) {
        for(let i in this.direction) {
            let x = this.direction[i][0];
            let y = this.direction[i][1];
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
            if (x >= 0 && y >= 0 && x <= matrix.length - 1 && y <= matrix.length - 1){
                if(index == 1) {
                    grassArr.push(new Grass(x, y));
                    matrix[y][x] = 1;
                }else if(index == 2) {
                    grassEatherArr.push(new GrassEather(x, y));
                    matrix[y][x] = 2;
                }else if(index == 3) {
                    meatEatherArr.push(new MeatEather(x, y));
                    matrix[y][x] = 3;
                }
            }
        }
        this.multiply = 0;
        this.newCordinates();
        this.updateDirection();

    }
}
