/**
 * Created by Lenovo on 2016/11/28.
 */
var board = new Array();

$(function () {
    //初始化表盘底部
    for(var i = 0 ;i < 4 ; i ++ )
        for(var j = 0 ; j < 4 ; j++ ){
            var gridCell = $('#grid-cell-'+i+'-'+j)
            gridCell.css('left', getPosLeft(i ,j))
            gridCell.css('top', getPosTop(i ,j))
        }

    //重置新游戏
    newgame();
});

function newgame() {
    //初始化新游戏
    init();
    //生成随机数
    generateOneNumber();
    generateOneNumber();
}

function init() {
    //为board数组赋值 0
    for(var i = 0 ; i < 4 ; i ++){
        board[i] = new Array();
        for( var j = 0 ; j < 4 ; j ++){
            board[i][j] = 0;
        }
    }
    //board层重新渲染
    updateBoardView();
}

function updateBoardView() {
    $('.number-cell').remove();
    for(var i = 0 ;i < 4 ; i ++ )
        for(var j = 0 ; j < 4 ; j++ ){
            $('#grid-container').append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
            var numberCell = $('#number-cell-'+i+'-'+j);
            //数字为0时
            if(board[i][j] == 0){
                numberCell.css('width','0px');
                numberCell.css('height','0px');
                numberCell.css('top',getPosTop(i,j)+50);
                numberCell.css('left',getPosLeft(i,j)+50);
            }
            //数字不为0时 改变背景色和字体颜色 并写入数字
            else{
                numberCell.css('width','100px');
                numberCell.css('height','100px');
                numberCell.css('top',getPosTop(i,j));
                numberCell.css('left',getPosLeft(i,j));
                numberCell.css('background-color',getNumberBackgroundColor(board[i][j]))
                numberCell.css('color',getNumberColor(board[i][j]))
                numberCell.text(board[i][j]);
            }
        }
}

//用户响应后游戏循环
$(document).keydown(function (event) {
    switch (event.keyCode){
        case 37://left
            if(moveLeft()){
                generateOneNumber();
                isGameOver();
            };
            break;
        case 38://up
            if(moveUp()){
                generateOneNumber();
                isGameOver();
            };
            break;
        case 39://right
            if(moveRight()){
                generateOneNumber();
                isGameOver();
            };
            break;
        case 40://down
            if(moveDown()){
                generateOneNumber();
                isGameOver();
            };
            break;
        default:
            break;
    }
})



