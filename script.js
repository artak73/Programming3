function setup() {

    var socket = io();

    var side = 30;

    var matrix = [];

    let grassCountElement = document.getElementById('grassCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');

    socket.on("data", drawCreatures);

    function drawCreatures(data) {

        matrix = data.matrix;
        grassCountElement.innerText = data.grassCounter;

        createCanvas(matrix[0].length * side, matrix.length * side)
        
        background('#acacac');
        
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
        
    }
}