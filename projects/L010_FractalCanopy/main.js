const canvas = document.getElementById('#fractalCanvas');
const ctx = canvas.getContext('2d');

const width = canvas.width;
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
let l = 200;
let s = 0;

function fractalCanopy(n, l) {
    if (n === 0) {
        turtle.forward(l);
    } else {
        turtle.turn(30);
        fractalCanopy(n - 1, l / 2);
        turtle.turn(-60);
        fractalCanopy(n - 1, l / 2);
        turtle.turn(30);
        turtle.forward(l);
    }
}

function draw() {
    ctx.clearRect(0, 0, width, height);
    turtle.x = 100;
    turtle.y = 180;
    turtle.angle = 0;
    ctx.beginPath(); 
    ctx.moveTo(turtle.x, turtle.y);
    fractalCanopy(n, l);
    n = (n + 1) % 6; 
}

draw();
