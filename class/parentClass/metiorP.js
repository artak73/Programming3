module.exports = class MetiorP{
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