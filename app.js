var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var score = document.getElementById("scoreSpan");

const scale = 10;
let head = {
x : 0,
y : 0
};
let xSpeed = 0;
let ySpeed = 0;
var direction = "Up";
let fruitX = 0;
let fruitY = 0;
const rows = canvas.height / scale;
const column = canvas.width / scale;
let snake = [head];
let total = 0;
let going ='';


function scene(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}  
setInterval(scene, 200);
    
    

function draw() {
    checkCollision();
    
    for(let j=1; j<snake.length; j++){
        ctx.fillStyle = ("#FFFFFF");
    ctx.fillRect(snake[j].x,snake[j].y,scale,scale);
}
    changePlace();
    
    ctx.fillStyle = ("#FFFFFF");
    ctx.fillRect(head.x,head.y,10,10);
    
    moveSnake();
   
    if(head.x > canvas.width){
        head.x = 0;
    }
    if (head.x < 0   ){
        head.x = canvas.width;
    }
    if(head.y > canvas.height){
        head.y = 0;
    }
    if(head.y < 0){
        head.y = canvas.height;
    }
    drawFruit();
    eat();
}
setInterval(draw, 200);

function changePlace(){
    for(let j=snake.length-1; j>=1; j--){
        
    snake[j].x = snake[j-1].x;
    snake[j].y = snake[j-1].y;
    }
}

function moveSnake(){
    head.x += xSpeed;
   head.y += ySpeed;
}

function move(direction){
    switch(direction){
        case "Up":
            if(going !='down'){
            console.log('move up');
            xSpeed = 0;
            ySpeed = -scale * 1;
            going = 'up';
            }
        break;
        case "Down":
            if(going !='up'){
            console.log('move down');
            xSpeed = 0;
            ySpeed = scale * 1;
            going = 'down';
            }
            break;
        case "Right":
            if(going !='left'){
            console.log('move right');
            xSpeed = scale *1;
            ySpeed = 0;
            going = 'right';
            }
            break;
        case "Left":
            if(going !='right'){
            xSpeed = -scale *1;
            ySpeed = 0;
            console.log('move left');
            going = 'left';
            }
            break;
           }
}
setInterval(move, 200)


window.addEventListener("keydown", evt =>{
    console.log(evt)
    let direction = evt.key.replace("Arrow", "");
    move(direction);
    
});

function fruitLocation(){
    fruitX = (Math.floor(Math.random()*column -1)+1) * scale;
    //console.log(fruitX);
    fruitY = (Math.floor(Math.random()*rows -1)+1) * scale;
    //console.log(fruitY);
    
}

function drawFruit(){
    ctx.fillStyle = "#ff0009"
    ctx.fillRect(fruitX, fruitY, 10,10)
}

fruitLocation();

function eat(){
    if(head.x === fruitX && head.y === fruitY){
        console.log('eating')
        ctx.clearRect(fruitX, fruitY, 10,10);
        total++;
        addPart();
        fruitLocation();
        console.log(total);
        return true
    }
    return false
}

function addPart (){
    var x;
    var y;
    console.log(snake);
    snake.push({x,y});
}

function checkCollision(){
    for (var i =1; i < snake.length; i++ ){
        if(snake[0].x === snake[i].x && snake[0].y === snake[i].y){
           console.log('U DEad')
            total = 0;
            snake = [head];
            snake[0].x =0;
            snake[0].y = 0;
           xSpeed = 0;
            ySpeed = 0;
            
           }
    }
}