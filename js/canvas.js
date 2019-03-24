var blockWidth = 4;
var movingBlock;

var colors = {
    black : "#000000",
    white : "#FFFFFF",
    aquamarine : "#33FFBB",
    coral : "#FF7F50",
    beige : "#F5F5DC",
    cadet_blue : "#5F9EA0",
    crimson : "#DC143C",
    dark_orange : "#FF8C00",
    gray : "#808080",
    indigo : "#4B0082",
    light_sea_green : "#20B2AA",
    pink : "#FFC0CB",
    forest_green : "#228B22"
};

function getColor(index){
var color_string = "";
switch(index){
    case 0:
    color_string = colors.white;
    break ;

    case 1:
    color_string = colors.black ;
    break ;

    case 2:
    color_string = colors.indigo;
    break ;

    case 3:
    color_string = colors.gray;
    break ;

    case 4:
    color_string = colors.crimson;
    break ;

    case 5:
    color_string = colors.coral;
    break ;
  }

  return color_string;
}


function setSize(size) {
  var canvas = document.getElementById("tetris");  
  canvas.width = size;
  canvas.height = size;
}


function paintCanvas(size, matrix) {
	var canvas = document.getElementById("tetris");
	var context = canvas.getContext("2d");
	var square = size/100;
	
	initMatrix(matrix);
	
	initBottomBlock(matrix);
	
	for(var i=0; i<100; i++){
		for(var j=0; j<100; j++){
			context.fillStyle = getColor(matrix[i][j]);
			context.fillRect(i*square, j*square, square, square);
		}
	}
	drawGrid(size, matrix);
}

function drawGrid(size, matrix) {
	var canvas = document.getElementById("tetris");
	var context = canvas.getContext("2d");
	var square = size/100;
		
    for (var i = 1; i <= 100; i++) {
        context.moveTo(i*square, 0);
        context.lineTo(i*square, size);
    }
    for (var i = 1; i <= 100; i++) {
        context.moveTo(0, i*square);
        context.lineTo(size, i*square);
    }
    context.strokeStyle = "black";
    context.stroke();
}


function initMatrix(matrix) {
	for(var i=39; i<60; i++){
		for(var j=39; j<60; j++){
			matrix[i][j]=1;
		}
	}
}


function initLeftBlock(matrix) {
	movingBlock = 0;
	var color = 2 + Math.floor(4*Math.random());
	for(var i=0; i<blockWidth; i++){
		for(var j=1+i; j<99-i; j++){
			matrix[i][j]=2;
		}
	}
}

function initRightBlock(matrix) {
	movingBlock = 0;
	for(var i=0; i<blockWidth; i++){
		for(var j=1+i; j<99-i; j++){
			matrix[99-i][j]=3;
		}
	}
}

function initTopBlock(matrix) {
	movingBlock = 0;
	for(var i=0; i<blockWidth; i++){
		for(var j=1+i; j<99-i; j++){
			matrix[j][i]=4;
		}
	}
}

function initBottomBlock(matrix) {
	movingBlock = 0;
	for(var i=0; i<blockWidth; i++){
		for(var j=1+i; j<99-i; j++){
			matrix[j][99-i]=5;
		}
	}
}

function moveLeftBlock(matrix, blockMatrix) {
	if(movingBlock<40-4*(blockMatrix[3].length+1)){
		movingBlock++;
	}
	for(var i=movingBlock; i<100-movingBlock; i++){
		matrix[movingBlock][i]=0;
	}
	for(var i=movingBlock+blockWidth; i<100-movingBlock-blockWidth; i++){
		matrix[movingBlock][i]=2;
	}
}