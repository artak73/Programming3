var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");
let MetiorAvatar = require('./class/metiorAvatar');
let Metior = require('./class/metior');

grassCount = 0;
grassEaterCountB = 0;
meatEaterCountB = 0;
aliensCountB = 0;
metiorCount = 0;

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);


grassArr = [];
grassEaterArr = [];
meatEatherArr = [];
AliensArr = [];
matrix = [];

var n = 50;

weath = "winter";
Grass = require("./class/grass");
GrassEather = require("./class/grassEater");
MeatEather = require("./class/meatEater");
Aliens = require("./class/aliens");

function rand(min, max) {
    return Math.random() * (max - min) + min;
}

for (let i = 0; i < n; i++) {
    matrix[i] = [];
    for (let j = 0; j < n; j++) {
        matrix[i][j] = Math.floor(rand(0, 3))
        
    }  
}

io.sockets.emit("send matrix", matrix);



function createObject() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                matrix[y][x] = 1;
                grassArr.push(new Grass(x, y)); 
            }else if (matrix[y][x] == 2) {
                matrix[y][x] = 2;
                grassEaterArr.push(new GrassEather(x, y, 2));
            }
        }
    }
    io.sockets.emit('send matrix', matrix);
}

function game() {
    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].move();
    }
    for (var i in meatEatherArr) {
        meatEatherArr[i].move();
    }
    for (var i in AliensArr) {
        AliensArr[i].act();
    }
    if(grassArr.length > 2500){
        for(let i = grassArr.length; i >= 2500; i++){
            grassArr.splice(i, 1);
        }
    }
    io.sockets.emit("send matrix", matrix);
    
    let sendDataNow = {
        matrix: matrix,
        grassCount: grassArr.length,
        grassEaterCount: grassEaterArr.length,
        meatEaterCount: meatEatherArr.length,
        aliensCount: AliensArr.length
    }
    let sendData = {
        matrix: matrix,
        grassBornCount: grassCount,
        grassBornEaterCount: grassEaterCountB,
        meatEaterBornCount: meatEaterCountB,
        aliensBornCount: aliensCountB,
        metiorCountB: metiorCount
    }
    io.sockets.emit("data", sendDataNow);
    io.sockets.emit("dataB", sendData);
}

setInterval(game, 200)


function kill() {
    AliensArr = [];
    grassArr = [];
    grassEaterArr = [];
    meatEatherArr = [];
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
    io.sockets.emit("send matrix", matrix);
}


function addGrass() {
    let metiorAvatar = new MetiorAvatar();  
    metiorAvatar.drop(1);
    grassCount += 25;
    metiorCount++;
    io.sockets.emit("send matrix", matrix);
}
function addGrassEater() {
    let metiorAvatar = new MetiorAvatar();
    metiorAvatar.drop(2);
    grassEaterCountB += 25;
    metiorCount++;
    io.sockets.emit("send matrix", matrix);
}
function addPredator(){
    let metiorAvatar = new MetiorAvatar();
    metiorAvatar.drop(3);
    grassEaterCountB += 25;
    metiorCount++;
    io.sockets.emit("send matrix", matrix);
}
function addAliens(){
    let aliens = new Metior(1, 5);
    aliens.drop();
    aliensCountB += 25;
    metiorCount++;
    io.sockets.emit("send matrix", matrix);
}

function weather() {
    if (weath == "winter") {
        weath = "spring";
    }
    else if (weath == "spring") {
        weath = "summer";
    }
    else if (weath == "summer") {
        weath = "autumn";
    }
    else if (weath == "autumn") {
        weath = "winter";
    }
    io.sockets.emit('weather', weath)
}
setInterval(weather, 5000);


////

io.on('connection', function (socket) {
    createObject();
    socket.on("kill", kill);
    socket.on("add grass", addGrass);
    socket.on("add grassEater", addGrassEater);
    socket.on("add predator", addPredator);
    socket.on("add aliens", addAliens);
});


var statistics = {};

setInterval(function() {
    statistics.grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
    statistics.meatEather = meatEatherArr.length;
    statistics.aliens = AliensArr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), function(){
        console.log("send");
    })
},1000)