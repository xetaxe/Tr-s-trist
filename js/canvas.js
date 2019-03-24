var blockWidth = 4;
var movingBlock;
var movingColor;

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
	movingColor = color;
	for(var i=0; i<blockWidth; i++){
		for(var j=1+i; j<99-i; j++){
			matrix[i][j]=color;
		}
	}
}

function initRightBlock(matrix) {
	movingBlock = 0;
	var color = 2 + Math.floor(4*Math.random());
	movingColor = color;
	for(var i=0; i<blockWidth; i++){
		for(var j=1+i; j<99-i; j++){
			matrix[99-i][j]=color;
		}
	}
}

function initTopBlock(matrix) {
	movingBlock = 0;
	var color = 2 + Math.floor(4*Math.random());
	movingColor = color;
	for(var i=0; i<blockWidth; i++){
		for(var j=1+i; j<99-i; j++){
			matrix[j][i]=color;
		}
	}
}

function initBottomBlock(matrix) {
	movingBlock = 0;
	var color = 2 + Math.floor(4*Math.random());
	movingColor = color;
	for(var i=0; i<blockWidth; i++){
		for(var j=1+i; j<99-i; j++){
			matrix[j][99-i]=color;
		}
	}
}

function moveLeftBlock(matrix, blockMatrix) {
	if(movingBlock+1 >= 36-4*blockMatrix[3].length){
		movingBlock = 0;
		blockMatrix[3].push(movingColor);
		return false;
	}
	else{
		for(var i=movingBlock; i<100-movingBlock; i++){
			matrix[movingBlock][i]=0;
		}
		for(var i=movingBlock+blockWidth; i<99-movingBlock-blockWidth; i++){
			matrix[movingBlock+blockWidth][i]=movingColor;
		}
		movingBlock++;
	}
}

function moveRightBlock(matrix, blockMatrix) {
	if(movingBlock >= 36-4*blockMatrix[1].length){
		movingBlock = 0;
		blockMatrix[1].push(movingColor);
		return false;
	}
	else{
		for(var i=movingBlock; i<100-movingBlock; i++){
			matrix[99-movingBlock][i]=0;
		}
		for(var i=movingBlock+blockWidth; i<100-movingBlock-blockWidth; i++){
			matrix[99-blockWidth-movingBlock][i]=movingColor;
		}
		movingBlock++;
	}
}

function moveTopBlock(matrix, blockMatrix) {
	if(movingBlock >= 36-4*blockMatrix[0].length){
		movingBlock = 0;
		blockMatrix[0].push(movingColor);
		return false;
	}
	else{
		for(var i=movingBlock; i<100-movingBlock; i++){
			matrix[i][movingBlock]=0;
		}
		for(var i=movingBlock+blockWidth; i<100-movingBlock-blockWidth; i++){
			matrix[i][movingBlock+blockWidth]=movingColor;
		}
		movingBlock++;
	}
}

function moveBottomBlock(matrix, blockMatrix) {
	if(movingBlock >= 36-4*blockMatrix[2].length){
		movingBlock = 0;
		blockMatrix[2].push(movingColor);
		return false;
	}
	else{
		for(var i=movingBlock; i<100-movingBlock; i++){
			matrix[i][99-movingBlock]=0;
		}
		for(var i=movingBlock+blockWidth; i<100-movingBlock-blockWidth; i++){
			matrix[i][99-movingBlock-blockWidth]=movingColor;
		}
		movingBlock++;
	}
}


function newBlock(index, matrix){
	switch(index){
    case 1:
    initLeftBlock(matrix);
    break ;

    case 2:
    initRightBlock(matrix);
    break ;

    case 3:
    initTopBlock(matrix);
    break ;

    case 4:
    initBottomBlock(matrix);
    break ;
	}
}

function moveBlock(index, matrix, blockMatrix){
	switch(index){
    case 1:
    return moveLeftBlock(matrix, blockMatrix);

    case 2:
    return moveRightBlock(matrix, blockMatrix);
    break ;

    case 3:
    return moveTopBlock(matrix, blockMatrix);
    break ;

    case 4:
    return moveBottomBlock(matrix, blockMatrix);
    break ;
	}
}

function rotateRight(matrix) {
	
}