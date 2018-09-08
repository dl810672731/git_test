function showNumberWithAnimation(i,j,randNumber){
	// 获取当前的数字格
	var numberCell = $("#number-cell-" + i + "-" + j);
	// 设置当前的数字格的背景色和前景色 及数字值
	numberCell.css("background-color",getNumberBackgroundColor(randNumber));
	numberCell.css("color",getNumberColor(randNumber));
	numberCell.text(randNumber);
	// 设置当前的数字格的显示动画
	
	numberCell.animate({
		width:cellSideLength,
		height:cellSideLength,
		top:getPosTop(i,j),
		left:getPosLeft(i,j)
	},50);

}

function showMoveAnimation(fromx,fromy,tox,toy){// 当前格子位置   目的地格子位置
	// 获取当前格子元素
	var numberCell = $("#number-cell-" + fromx + "-" + fromy);
		numberCell.animate({
		top:getPosTop(tox,toy),
		left:getPosLeft(tox,toy)
	},200);
}

function updateScore(score){
	$("#score").text(score);
}
