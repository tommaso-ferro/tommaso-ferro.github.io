const canvas = document.querySelector('#canvas');
const slider = document.querySelector('#myRange');
const output = document.querySelector('#sizeValue');
const button1 = document.querySelector('#zoomIn');
const button2 = document.querySelector('#zoomOut');
const colorPicker = document.querySelector('#colorPicker');
const resetButton = document.querySelector('#resetZoom');
const ctx = canvas.getContext('2d');
const width =  canvas.width;
const height = canvas.height;

const turtle = {
    x: 100,
    y: 180,
    angle: 0,
    penDown: true,
    color: '#000000',
    turn: function(a) {
        this.angle = (this.angle + a);
    },
    forward: function(l){
        const rad = this.angle * Math.PI / 180;
        const newX = this.x + l * Math.cos(rad);
        const newY = this.y + l * Math.sin(rad);
        if (this.penDown) {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(newX, newY);
            this.setColor(this.color);
            ctx.stroke();
        }
        this.x = newX;
        this.y = newY;
    },
    setColor: function(c) {
        this.color = c;
        ctx.strokeStyle = this.color;
    }
}

let n = 0;
let l = 400;
let s = 0;

ctx.beginPath(); 
ctx.moveTo(turtle.x, turtle.y);
function koch(n, l) {
    if (n === 0) {

        turtle.forward(l);
    } else {
        koch(n - 1, l / 3);
        turtle.turn(300);
        koch(n - 1, l / 3);
        turtle.turn(120);
        koch(n - 1, l / 3);
        turtle.turn(300);
        koch(n - 1, l / 3);
    }
}

function drawSnowflake(n2, l) {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < 3; i++) {
        koch(n2, l);
        turtle.turn(120);
    }
}

slider.oninput = function() {
    output.innerHTML = this.value;
    s = Number(this.value); 
    drawSnowflake(n + s, l);
}

colorPicker.oninput = function() {
    turtle.setColor(this.value);
    drawSnowflake(n + s, l);
}

function init() {
    turtle.setColor('#000000');
    drawSnowflake(n, l);
}

button1.onclick = function() {
    if (n + s >= 4){
        l += 100;
        drawSnowflake(n + s, l);
    } else if(n + s === 5){
        l += 150;
        drawSnowflake(n + s, l);
    }
}

button2.onclick = function() {

    if (l >= 400){
        if (n + s >= 4){
            l -= 100;
            drawSnowflake(n + s, l);
        } else if(n + s === 5){
            l -= 150;
            drawSnowflake(n + s, l);
        }
    } else {
        l = 400;
        drawSnowflake(n + s, l);
        alert("Minimum size reached");
    }
    
}

resetButton.onclick = function() {
    l = 400;
    n = 0;
    s = 0;
    slider.value = 0;
    output.innerHTML = 0;
    turtle.x = 100;
    turtle.y = 180;
    turtle.angle = 0;
    turtle.setColor('#000000');
    colorPicker.value = '#000000';
    drawSnowflake(n, l);
}


init();