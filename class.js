class Grass extends LivingCreature{
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
class GrassEather extends LivingCreature{
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
class MeatEather extends LivingCreature{
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

        if (this.multiply >= 8) {
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
            for (var i in grassEatherArr) {
                if (newX == grassEatherArr[i].x && newY == grassEatherArr[i].y) {
                    grassEatherArr.splice(i, 1);
                    break;
                }
            }
            this.y = newY;
            this.x = newX;
            this.energy += 1;
            this.multiply += 3;
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
            var newGrassEater = new MeatEather(newCell[0], newCell[1]);
            meatEatherArr.push(newGrassEater);
            matrix[newCell[1]][newCell[0]] = 3;
            this.multiply = 8;
        }
    }
}
class Aliens extends LivingCreature{
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
class Metior extends MetiorP{
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
class MetiorAvatar extends MetiorP{
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
