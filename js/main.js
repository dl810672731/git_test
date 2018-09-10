var board = new Array();
var score = 0;
var HasConflicted = new Array(); // 这个二维数组记录每个位置的碰撞情况，是否有碰撞累加


// 手机端触控
var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;


$(function() {
	prepareForMobile();
	newgame();
});

function prepareForMobile(){
	
	if(documentWidth > 500){// 如果当前设备屏幕宽度大于500px
		gridContainerWidth = 500;
		cellSpace = 20;
		cellSideLength = 100;
	}
	
	$("#grid-container").css('width',gridContainerWidth - 2*cellSpace);
	$("#grid-container").css('height',gridContainerWidth - 2*cellSpace);
	$("#grid-container").css('padding',cellSpace);
	$("#grid-container").css('border-radius',0.02*gridContainerWidth);
	
	$(".grid-cell").css('width',cellSideLength);
	$(".grid-cell").css('height',cellSideLength);
	$(".grid-cell").css('border-radius',0.02*cellSideLength);
}

function newgame() {
	// 初始化棋盘 和数字格
	init();

	// 生成两个随机位置的随机数字
	setTimeout("generateOneNumber();", 300);
	setTimeout("generateOneNumber();", 400);

}

function init() {
	for(var i = 0; i < 4; i++) {
		//定义个一个二维数组
		board[i] = new Array();
		HasConflicted[i] = new Array();
		for(var j = 0; j < 4; j++) {
			// 初始化小格子的值为0
			board[i][j] = 0;
			HasConflicted[i][j] = false; // 初始化每个格子的位置没有发生碰撞
			var gridCell = $("#grid-cell-" + i + "-" + j);
			// 设置每个格子距离棋盘顶部的距离
			gridCell.css("top", getPosTop(i, j));
			// 设置每个格子距离棋盘左部的距离
			gridCell.css("left", getPosLeft(i, j));
		}
	}
	updateBoardView();
	score = 0;
	document.getElementById("score").innerHTML= score; // 将分数值重置为 0 
}

function updateBoardView() {
	// 将移动之前的数字格移除
	$(".number-cell").remove();
	for(var i = 0; i < 4; i++) {
		for(var j = 0; j < 4; j++) {
			$("#grid-container").append("<div class='number-cell' id='number-cell-" + i + "-" + j + "'></div>");
			var numberCell = $("#number-cell-" + i + "-" + j);
			// 如果棋盘格的值为 0 的话 ，设置数字格的宽高都为 0 
			//board[i][j] = 0;
			if(board[i][j] == 0) {
				numberCell.css("width", "0px");
				numberCell.css("height", "0px");
				numberCell.css("top", getPosTop(i, j) + cellSideLength/2);
				numberCell.css("left", getPosLeft(i, j) + cellSideLength/2);
			} else {
				numberCell.css("width", cellSideLength);
				numberCell.css("height", cellSideLength);
				numberCell.css("top", getPosTop(i, j));
				numberCell.css("left", getPosLeft(i, j));
				numberCell.css("background-color", getNumberBackgroundColor(board[i][j]));
				numberCell.css("color", getNumberColor(board[i][j]));
				numberCell.text(board[i][j]);
			}
			HasConflicted[i][j] = false; // 上一次的碰撞之后，重新恢复所有格子的状态
		}
	}
	$(".number-cell").css('line-height',cellSideLength + 'px');
	$(".number-cell").css('font-size',0.6*cellSideLength + 'px');
	

}

function generateOneNumber() { // 随机生成一个随机数字
	if(nospace(board))
		return false;

	//随机一个位置
	var randx = parseInt(Math.floor(Math.random() * 4));
	var randy = parseInt(Math.floor(Math.random() * 4));

	times = 0; // 记录随机操作的次数，初始化为 0 次
	while(times < 50) { // 随机50次操作
		if(board[randx][randy] == 0)
			break;

		randx = parseInt(Math.floor(Math.random() * 4));
		randy = parseInt(Math.floor(Math.random() * 4));

		times++;
	}
	if(times == 50) {
		// 50次还有找到空位置
		for(var i = 0; i < 4; i++)
			for(var j = 0; j < 4; j++) {
				// 遍历寻找空格子，将找的第一个空格子确定为选中的位置
				if(board[i][j] == 0) {
					randx = i;
					randy = j;
				}
			}
	}

	//随机一个数字
	var randNumber = Math.random() < 0.5 ? 2 : 4;

	//在随机位置显示随机数字
	board[randx][randy] = randNumber;
	showNumberWithAnimation(randx, randy, randNumber);

	return true;

}