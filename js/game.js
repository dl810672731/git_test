// 响应键盘事件
$(document).keydown(function(event) {
	switch(event.keyCode) {
		event.preventDefault();// 阻挡按键的默认操作，例如，按下"上方向键"时，滚动条不会向上
		case 37: // left
			/**moveLeft()
			 * moveLeft()返回值是boolean类型，
			 * 先执行moveLeft()方法完成向左移动的逻辑，
			 * 再判断是否可以向左移动
			 */
			event.preventDefault();// 阻挡按键的默认操作
			if(moveLeft()) {
				// 重新随机生成一个数字
				setTimeout("generateOneNumber();", 210);

				// 判断游戏是否结束
				setTimeout("isgameover();", 300);

			}
			break;
		case 38: // up
		event.preventDefault();
			if(moveUp()) {
				setTimeout("generateOneNumber();", 210);

				// 判断游戏是否结束
				setTimeout("isgameover();", 300);
			}
			break;
		case 39: // right
		event.preventDefault();
			if(moveRight()) {
				setTimeout("generateOneNumber();", 210);

				// 判断游戏是否结束
				setTimeout("isgameover();", 300);
			}
			break;
		case 40: // down
		event.preventDefault();
			if(moveDown()) {
				setTimeout("generateOneNumber();", 210);

				// 判断游戏是否结束
				setTimeout("isgameover();", 300);
			}
			break;
		default:
			alert("按键错误! 请选择键盘上的方向键");
			break;
	}
});

document.addEventListener("touchmove",function(event){
	event.preventDefault();
})

// 手机端触控事件
document.addEventListener('touchstart', function(event) {
	startx = event.touches[0].pageX;
	starty = event.touches[0].pageY;
});

document.addEventListener('touchend', function(event) {
	endx = event.changedTouches[0].pageX;
	endy = event.changedTouches[0].pageY;

	var deltax = endx - startx;
	var deltay = endy - starty;
	
	//判断是否用户进行了滑动操作，而不是无意中的点击（即：需要有明显的滑动）
	if(Math.abs(deltax) < 0.05 * documentWidth && Math.abs(deltay) < 0.05 * documentWidth)
		return;// 如果用户的滑动小于屏幕宽度的0.05倍，则不视为滑动操作
	
	// x方向上的移动
	if(Math.abs(deltax) >= Math.abs(deltay)) {
		if(deltax > 0) {
			// move right
			if(moveRight()) {
				setTimeout("generateOneNumber();", 210);

				// 判断游戏是否结束
				setTimeout("isgameover();", 300);
			}
		} else {
			// move left
			if(moveLeft()) {
				// 重新随机生成一个数字
				setTimeout("generateOneNumber();", 210);

				// 判断游戏是否结束
				setTimeout("isgameover();", 300);

			}

		}
	}
	// y方向上的移动
	else {
		if(deltay > 0) {
			// move down
			if(moveDown()) {
				setTimeout("generateOneNumber();", 210);

				// 判断游戏是否结束
				setTimeout("isgameover();", 300);
			}
		} else {
			// move up
			if(moveUp()) {
				setTimeout("generateOneNumber();", 210);

				// 判断游戏是否结束
				setTimeout("isgameover();", 300);
			}
		}
	}

});

// 判断游戏是否结束
function isgameover() {
	if(nospace(board) && nomove(board)) {
		gameover();
	}
}

function gameover() {
	alert("gameover");
}

function moveLeft() {
	// 返回值是Boolean类型，判断是否可以向左移动
	if(!canMoveLeft(board)) {
		// 当前格子无法移动
		return false;
	}
	// 完成向左移动的逻辑 对16个格子
	for(var i = 0; i < 4; i++) { // 行
		for(var j = 1; j < 4; j++) { // 第1列不可以向左移动，从第2列开始
			// 当前数字格子有值（2或者4，一定不是0的）
			if(board[i][j] != 0) {
				// 向左移动逻辑
				for(var k = 0; k < j; k++) {
					if(board[i][k] == 0 && noBlokHorizontalCol(i, k, j, board)) {
						// 指定格子为0 中间格子也为0  才能向左移动
						showMoveAnimation(i, j, i, k); // 动画方法
						board[i][k] = board[i][j];
						board[i][j] = 0;

						continue;

					} else if(board[i][k] == board[i][j] && noBlokHorizontalCol(i, k, j, board) && !HasConflicted[i][k]) {
						// 以上判断条件最后一项，指目的地格子处上次未发生碰撞
						showMoveAnimation(i, j, i, k); // 动画方法
						board[i][k] += board[i][j];
						board[i][j] = 0;

						// add score
						score += board[i][k];
						updateScore(score);
						HasConflicted[i][k] = true; // 发生了碰撞，这个位置

						continue;
					}
				}

			}

		}

	}

	// 以上执行完之后，停止240毫秒后再执行移动
	setTimeout("updateBoardView();", 240);
	return true;
}

function moveRight() {
	// 返回值是Boolean类型，判断是否可以向右移动
	if(!canMoveRight(board)) { // 未定义
		// 当前格子无法移动
		return false;
	}
	// 完成向右移动的逻辑 对16个格子
	for(var i = 0; i < 4; i++) { // 行
		for(var j = 2; j >= 0; j--) { // 最后一列不可移动
			// 当前数字格子有值（2或者4，一定不是0的）
			if(board[i][j] != 0) { // 如果格子里的数字不为0
				// 向右移动逻辑
				for(var k = 3; k > j; k--) {
					if(board[i][k] == 0 && noBlokHorizontalCol(i, j, k, board)) {
						// 指定格子为0 中间格子也为0  才能向右移动
						showMoveAnimation(i, j, i, k); // 动画方法
						board[i][k] = board[i][j];
						board[i][j] = 0;

						continue;

					} else if(board[i][k] == board[i][j] && noBlokHorizontalCol(i, j, k, board) && !HasConflicted[i][k]) {
						showMoveAnimation(i, j, i, k); // 动画方法
						board[i][k] += board[i][j];
						board[i][j] = 0;

						// add score
						score += board[i][k];
						updateScore(score);

						HasConflicted[i][k] = true;

						continue;
					}
				}

			}

		}

	}

	// 以上执行完之后，停止240毫秒后再执行移动
	setTimeout("updateBoardView();", 240);
	return true;
}

function moveUp() {

	if(!canMoveUp(board))
		return false;

	//moveUp
	for(var j = 0; j < 4; j++)
		for(var i = 1; i < 4; i++) {
			if(board[i][j] != 0) {
				for(var k = 0; k < i; k++) {

					if(board[k][j] == 0 && noBlockVertical(j, k, i, board)) {
						showMoveAnimation(i, j, k, j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					} else if(board[k][j] == board[i][j] && noBlockVertical(j, k, i, board) && !HasConflicted[k][j]) {
						showMoveAnimation(i, j, k, j);
						board[k][j] *= 2;
						board[i][j] = 0;

						// add score
						score += board[k][j];
						updateScore(score);

						HasConflicted[k][j] = true;
						continue;
					}
				}
			}
		}

	setTimeout("updateBoardView()", 240);
	return true;
}

function moveDown() {
	if(!canMoveDown(board))
		return false;

	//moveDown
	for(var j = 0; j < 4; j++)
		for(var i = 2; i >= 0; i--) {
			if(board[i][j] != 0) {
				for(var k = 3; k > i; k--) {

					if(board[k][j] == 0 && noBlockVertical(j, i, k, board)) {
						showMoveAnimation(i, j, k, j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					} else if(board[k][j] == board[i][j] && noBlockVertical(j, i, k, board) && !HasConflicted[k][j]) {
						showMoveAnimation(i, j, k, j);
						board[k][j] *= 2;
						board[i][j] = 0;

						// add score
						score += board[k][j];
						updateScore(score);

						HasConflicted[k][j] = true;
						continue;
					}
				}
			}
		}

	setTimeout("updateBoardView()", 240);
	return true;
}