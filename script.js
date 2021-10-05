var socket = io();
let weath = "summer";
const side = 10;
const CSIDE = 50;
let grassCount = document.getElementById("grassCount");
let grassEaterCount = document.getElementById("grassEaterCount");
let meatEaterCount = document.getElementById("meatEaterCount");
let aliensCount = document.getElementById("aliensCount");

let grassCountB = document.getElementById("grassCountB");
let grassEaterCountB = document.getElementById("grassEaterCountB");
let meatEaterCountB = document.getElementById("meatEaterCountB");
let aliensCountB = document.getElementById("aliensCountB");
let metiorCountB = document.getElementById("metiorCount");


function setup() {
    createCanvas(CSIDE * side, CSIDE * side);
    background("black");
}
socket.on("weather", function (data) {
    weath = data;
})
socket.on('data', changeData);
function changeData(data){
    grassCount.innerHTML = data.grassCount;
    grassEaterCount.innerHTML = data.grassEaterCount;
    meatEaterCount.innerHTML = data.meatEaterCount;
    aliensCount.innerHTML = data.aliensCount;

    
}
socket.on('dataB', changeDataB);
function changeDataB(dataB){
    grassCountB.innerHTML = dataB.grassBornCount;
    grassEaterCountB.innerHTML = dataB.grassBornEaterCount;
    meatEaterCountB.innerHTML = dataB.meatEaterBornCount;
    aliensCountB.innerHTML = dataB.aliensBornCount;  
    metiorCountB.innerHTML = dataB.metiorCountB;
}
function nkarel(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[0].length; x++) {
            var obj = matrix[y][x];
            if (obj == 1) {
                if (weath == "summer") {
                    fill("green");
                } else if (weath == "autumn") {
                    fill("#333300");
                } else if (weath == "winter") {
                    fill("white");
                } else if (weath == "spring") {
                    fill("#4dffa6");
                }
            } else if (obj == 2) {
                fill("yellow");
            } else if (obj == 3) {
                fill("red");
            } else if (obj == 4) {
                fill("blue");
            }else if (obj == 0) {
                fill("grey");
            }
            rect(x * side, y * side, side, side);
        }
    }
}

socket.on('send matrix', nkarel);



function kill() {
    socket.emit("kill");
}
function addGrass() {
    socket.emit("add grass");
}
function addGrassEater() {
    socket.emit("add grassEater");
}
function addPredator() {
    socket.emit("add predator");
}
function addAliens() {
    socket.emit("add aliens");
}