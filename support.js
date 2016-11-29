/**
 * Created by Lenovo on 2016/11/28.
 */

//生成随机数
function generateOneNumber() {
    if(nospace(board))
        return false;

    var randx = parseInt(Math.floor(Math.random()*4));
    var randy = parseInt(Math.floor(Math.random()*4));

    while (true) {
        if(board[randx][randy] == 0){
            break;
        }
        randx = parseInt(Math.floor(Math.random()*4));
        randy = parseInt(Math.floor(Math.random()*4));

    }

    var randNumber = Math.random() < 0.5 ? 2 : 4;

    board[randx][randy] = randNumber;
    showNumberWithAnimation(randx,randy,randNumber);

    return true;
}

//判断游戏是否结束
function isGameOver() {

}


function getPosTop(i, j) {
    return 20+i*120
}

function getPosLeft(i, j) {
    return 20+j*120
}

function getNumberBackgroundColor(number) {
    switch (number){
        case 2:return "#eee4da";break;
        case 4:return "#ede0c8";break;
        case 8:return "#f2b179";break;
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

    return 'black';
}

function getNumberColor(number) {
    if(number <= 4)
        return "#776e65";
    return 'white';
}

function nospace(board) {
    for(var i = 0 ;i < 4 ; i ++ )
        for(var j = 0 ; j < 4 ; j++ ){
            if(board[i][j] == 0){
                return false;
            }

        }

    return true;
}

function showNumberWithAnimation(i,j,randNumber) {
    var numberCell = $('#number-cell-'+i+'-'+j);

    numberCell.css('background-color',getNumberBackgroundColor(randNumber));
    numberCell.css('color',getNumberColor(randNumber));
    numberCell.text(randNumber);

    numberCell.animate(
        {
            width:'100px',
            height:'100px',
            top:getPosTop(i,j),
            left:getPosLeft(i,j),
        },500
    )
}

function showMoveAnimation(fromx,fromy,tox,toy) {
    var numberCell = $('#number-cell-'+fromx+'-'+fromy);
    numberCell.animate({
        top:getPosTop(tox,toy),
        left:getPosLeft(tox,toy)
    },200);
}

function canMoveLeft(board) {
    //左侧是否没有数字
    //左侧数字是否跟自己相等

    for(var i = 0 ;i < 4 ; i ++ )
        for(var j = 1 ; j < 4 ; j++ ){
            if(board[i][j] != 0){
                if(board[i][j-1] == 0 || board[i][j-1] == board[i][j]){
                    return true;
                }
            }

        }

    return false;

}

function canMoveRight(board) {
    for(var i = 0 ;i < 4 ; i ++ )
        for(var j = 0 ; j < 3 ; j++ ){
            if(board[i][j] != 0){
                if(board[i][j+1] == 0 || board[i][j+1] == board[i][j]){
                    return true;
                }
            }

        }
    return false;
}


function canMoveUp(board) {
    for(var i = 1 ;i < 4 ; i ++ )
        for(var j = 0 ; j < 4 ; j++ ){
            if(board[i][j] != 0){
                if(board[i-1][j] == 0 || board[i-1][j] == board[i][j]){
                    return true;
                }
            }

        }
    return false;
}

function canMoveDown(board) {
    for(var i = 0 ;i < 3 ; i ++ )
        for(var j = 0 ; j < 4 ; j++ ){
            if(board[i][j] != 0){
                if(board[i+1][j] == 0 || board[i+1][j] == board[i][j]){
                    return true;
                }
            }

        }
    return false;
}
function noBlockHorizontal(row,k,j) {
    for(var i = k+1;i < j ; i ++){
        if(row[i] != 0)
            return false;
    }
    return true;
}

function noBlockVertical(board,i,j,k){
    for(var h = k+1;h < i ; h ++){
        if(board[h][j] != 0)
            return false;
    }
    return true;
}



//向左
function moveLeft() {
    if(!canMoveLeft(board)){
        return false;
    }
    //落脚位置是否为空
    //落脚位置数字是否与自相等

    for(var i = 0 ;i < 4 ; i ++ )
        for(var j = 1 ; j < 4 ; j++ ){
            if(board[i][j] != 0){

                for( var k = 0 ; k < j ; k ++){
                    if(board[i][k] == 0 && noBlockHorizontal(board[i],k,j)){
                        //move
                        showMoveAnimation(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[i][k] == board[i][j] && noBlockHorizontal(board[i],k,j)){
                        showMoveAnimation(i,j,i,k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                }
            }
        }
    setTimeout(function () {
        updateBoardView();
    },200);
    return true;
}

//向上
function moveUp() {
    if(!canMoveUp(board)){
        return false;
    }
    //落脚位置是否为空
    //落脚位置数字是否与自相等

    for(var j = 0 ;j < 4 ; j ++ )
        for(var i = 1 ; i < 4 ; i++ ){
            if(board[i][j] != 0){

                for( var k = 0 ; k < i ; k ++){
                    if(board[k][j] == 0 && noBlockVertical(board,i,j,k)){
                        //move
                        showMoveAnimation(i,j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[k][j] == board[i][j] && noBlockVertical(board,i,j,k)){
                        showMoveAnimation(i,j,k,j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                }
            }
        }
    setTimeout(function () {
        updateBoardView();
    },200);
    return true;
}

//向右
function moveRight() {
    if(!canMoveRight(board)){
        return false;
    }
    //落脚位置是否为空
    //落脚位置数字是否与自相等
    for(var i = 0 ;i < 4 ; i ++ )
        for(var j = 2 ; j >= 0 ; j-- ){
            if(board[i][j] != 0){
                for( var k = 3 ; k > j; k --){
                    if(board[i][k] == 0 && noBlockHorizontal(board[i],j,k)){
                        //move
                        showMoveAnimation(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[i][k] == board[i][j] && noBlockHorizontal(board[i],j,k)){
                        showMoveAnimation(i,j,i,k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                }
            }
        }
    setTimeout(function () {
        updateBoardView();
    },200);
    return true;
}


//向下
function moveDown() {
    if(!canMoveDown(board)){
        alert('false');
        return false;
    }
    //落脚位置是否为空
    //落脚位置数字是否与自相等

    for(var j = 0 ;j < 4 ; j ++ )
        for(var i = 2 ; i >=0 ; i --){
            if(board[i][j] != 0){

                for( var k = 3 ; k > i ; k --){
                    if(board[k][j] == 0 && noBlockVertical(board,k,j,i)){
                        //move
                        showMoveAnimation(i,j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[k][j] == board[i][j] && noBlockVertical(board,k,j,i)){
                        showMoveAnimation(i,j,k,j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                }
            }
        }
    setTimeout(function () {
        updateBoardView();
    },200);
    return true;
}