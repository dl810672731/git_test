// 获取当前设备的屏幕宽度
documentWidth = window.screen.availWidth;
gridContainerWidth = 0.92 * documentWidth;
cellSideLength = 0.18 * documentWidth; // 一个小方格长度
cellSpace = 0.04 * documentWidth;



function getPosTop(i, j) {
	return cellSpace + i*(cellSpace + cellSideLength);
}

function getPosLeft(i, j) {
	return cellSpace + j*(cellSpace + cellSideLength);
}

function getNumberBackgroundColor(number) {
	switch(number) {
        case 2:return "#eee4da";break;
        case 4:return "#ede0c8";break;
        case 8:return "#759977";break;
        case 16:return "#f59563";break;
        case 32:return "#f67c5f";break;
        case 64:return "#f65e3b";break;
        case 128:return "#edcf72";break;
        case 256:return "#edcc61";break;
        case 512:return "#9c0";break;
        case 1024:return "#33b5e5";break;
        case 2048:return "#09c";break;
        case 4096:return "#a6c";break;
        case 8192:return "#93c";break;
	}
}

function getNumberColor(number){
	if(number < 4){
		return "#776E65"
	}
	return "#ff0";
}

// 全部的格子里是否还有空格子
function nospace(board){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(board[i][j] == 0){
				return false;// 还有空格子 还有没有数字的格子
			}
		}
	}
	return true;// 格子都有数字了
}

// 是否可以向左移动
function canMoveLeft(board){
	for(var i = 0;i<4;i++){
		for(var j = 1;j<4;j++){
			if(board[i][j] != 0){
				/*
				 * 从第2列开始 当前数字格左边的第一个格子的值为0  
				 * 或者 
				 * 当前数字格的值和它的左边第一个数字格的值相等
				 */
				if(board[i][j - 1] == 0|| board[i][j - 1] == board[i][j]){
					return true;
				}
			}
		}
		
	}
	return false;
}


// 是否可以向右移动
function canMoveRight(board){
	for(var i=0;i<4;i++){// 行
		for(var j=2;j>=0;j--){// 最后一列不可移动
			if(board[i][j] != 0){
				/*
				 * 当前数字格右边的第一个格子的值为0  
				 * 或者 
				 * 当前数字格的值和它的右边第一个数字格的值相等
				 */
				if(board[i][j + 1] == 0|| board[i][j + 1] == board[i][j]){
					return true;
				}
			}
		}
		
	}
	return false;
}


function canMoveUp( board ){

    for( var j = 0 ; j < 4 ; j ++ )
        for( var i = 1 ; i < 4 ; i ++ )
            if( board[i][j] != 0 )
                if( board[i-1][j] == 0 || board[i-1][j] == board[i][j] )
                    return true;

    return false;
}

function canMoveDown( board ){

    for( var j = 0 ; j < 4 ; j ++ )
        for( var i = 2 ; i >= 0 ; i -- )
            if( board[i][j] != 0 )
                if( board[i+1][j] == 0 || board[i+1][j] == board[i][j] )
                    return true;

    return false;
}

// 当前格子个指定格子之间是否全为0  适用于左右
function noBlokHorizontalCol(row,col1,col2,board){
	for(var i = col1 + 1;i<col2;i++){
		if(board[row][i] != 0){ // 之间的格子有值  不可移动
			return false;
		}
	}
	return true;// 之间的格子数字全为0
}


// 当前格子个指定格子之间是否全为0  适用于上下
function noBlockVertical( col , row1 , row2 , board ){
    for( var i = row1 + 1 ; i < row2 ; i ++ )
        if( board[i][col] != 0 )
            return false;
    return true;
}

function nomove(board){
	if(canMoveLeft(board)
	  || canMoveRight(board)
	  || canMoveUp(board)
	  || canMoveDown(board)){
	  	return false;
	}
		
	return true;// 不能移动了
}

