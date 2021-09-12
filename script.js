var matrix = [];
var grassArr = [];
var grassEatherArr = [];
var AliensArr = [];
var meatEatherArr = [];
var side = 10;
var interval = 10;
var dieInterval = interval / 2;
var met = new Metior();
var meta = new MetiorAvatar();
var canvasSide;
var oneCycle = 0;
function randomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
function generateMatrix(side, GrassCount, GrassEaterCount, MeatEatherCount){ 
    for(let i = 0; i < side; i++) {   
        let arr = [];
        matrix.push(arr);
        for(let j = 0; j < side; j++) {   
            matrix[i].push(0);   
        }     
    }
    for (let i = 0; i < GrassCount; i++) {
        let x = Math.round(random(0, side - 1))
        let y = Math.round(random(0, side - 1))
        let gr = new Grass(x,y);
        grassArr.push(gr);
        matrix[y][x] = 1;
    }
    for (let i = 0; i < GrassEaterCount; i++) {
        let x = Math.round(random(0, side - 1));
        let y = Math.round(random(0, side - 1));
        let Xt = new GrassEather(x,y);
        grassEatherArr.push(Xt);
        matrix[y][x] = 2;
    }
    for (let i = 0; i < MeatEatherCount; i++) {
        let x = Math.round(random(0, side - 1));
        let y = Math.round(random(0, side - 1));
        let Me = new MeatEather(x,y);
        meatEatherArr.push(Me);
        matrix[y][x] = 2;
    }
}
function setup(){
    frameRate(5);
    generateMatrix(50,30,10,15);
    createCanvas(side * matrix[0].length   , side * matrix.length);
    canvasSide = matrix.length;
    console.log(canvasSide);
    background("grey");
}
function draw(){
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill("green");
            }else if (matrix[y][x] == 0){
                fill("grey");
            }else if (matrix[y][x] == 2){
                fill("yellow");
            }else if (matrix[y][x] == 3){
                fill("red");
            }else if (matrix[y][x] == 4){
                matrix[y][x] = 5;
                fill("#eb6734");
            }else if (matrix[y][x] == 5){
                fill("blue");
            }
            rect(x * side, y * side, side, side);
        }
    }
    for(let i in meatEatherArr){
        meatEatherArr[i].move();
    }
    for(let i in grassArr){
        grassArr[i].act();
    }
    for(let i in grassEatherArr){
        grassEatherArr[i].move();
    }
    for(let i in AliensArr){
        AliensArr[i].act();
    }
    met.drop();
    if(grassArr.length <= 10){
        meta.drop(1);    
    }
    if(grassEatherArr.length <= 10){
        meta.drop(2);    
    }
    if(meatEatherArr.length <= 2){
        meta.drop(3);    
    }
    oneCycle++;
}