class LivingCreature {
    constructor(x, y, index){
        this.x = x;
        this.y = y;
        this.energy = 5;
        this.directions = [
           [this.x - 1, this.y - 1],
           [this.x, this.y - 1],
           [this.x + 1, this.y - 1],
           [this.x - 1, this.y],
           [this.x + 1, this.y],
           [this.x - 1, this.y + 1],
           [this.x, this.y + 1],
           [this.x + 1, this.y + 1]
       ];

    }
    chooseCell(ch) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                if (matrix[y][x] == ch) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    updateDirection() {
        this.direction = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
}
class MetiorP{
    constructor() {
        this.multiply = 0;
        this.x = randomInt(canvasSide);
        this.y = randomInt(canvasSide);
        this.energy = 5;
        this.direction = [
            [this.x - 1, this.y - 2],
            [this.x - 1, this.y - 1],
            [this.x - 2, this.y - 1],
            [this.x + 1, this.y + 2],
            [this.x + 1, this.y + 1],
            [this.x + 2, this.y + 1],
            [this.x + 3, this.y],
            [this.x + 2, this.y],
            [this.x + 1, this.y],
            [this.x - 3, this.y],
            [this.x - 2, this.y],
            [this.x - 1, this.y],
            [this.x, this.y + 1],
            [this.x, this.y + 2],
            [this.x, this.y + 3],
            [this.x, this.y - 1],
            [this.x, this.y - 2],
            [this.x, this.y - 3],
            [this.x, this.y],
            [this.x - 1, this.y + 2],
            [this.x - 1, this.y + 1],
            [this.x - 2, this.y + 1],
            [this.x + 1, this.y - 2],
            [this.x + 1, this.y - 1],
            [this.x + 2, this.y - 1],
        ];
    }
    newCordinates() {
        this.x = randomInt(canvasSide);
        this.y = randomInt(canvasSide);
    }
    updateDirection() {
        this.direction = [
            [this.x - 1, this.y - 2],
            [this.x - 1, this.y - 1],
            [this.x - 2, this.y - 1],
            [this.x + 1, this.y + 2],
            [this.x + 1, this.y + 1],
            [this.x + 2, this.y + 1],
            [this.x + 3, this.y],
            [this.x + 2, this.y],
            [this.x + 1, this.y],
            [this.x - 3, this.y],
            [this.x - 2, this.y],
            [this.x - 1, this.y],
            [this.x, this.y + 1],
            [this.x, this.y + 2],
            [this.x, this.y + 3],
            [this.x, this.y - 1],
            [this.x, this.y - 2],
            [this.x, this.y - 3],
            [this.x, this.y],
            [this.x - 1, this.y + 2],
            [this.x - 1, this.y + 1],
            [this.x - 2, this.y + 1],
            [this.x + 1, this.y - 2],
            [this.x + 1, this.y - 1],
            [this.x + 2, this.y - 1],
        ];
    }
}
