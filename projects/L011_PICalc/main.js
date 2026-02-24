const canvas = document.querySelector('#canvas');
const startButton = document.querySelector('#startbutton')
const resetButton = document.querySelector('#resetbutton')
const montecarloButton = document.querySelector('#montecarloMethod')
const trapezoidButton = document.querySelector('#trapezoidMethod')
const title = document.querySelector('#title')
const ctx = canvas.getContext('2d');
const height = canvas.height;
const width = canvas.width;

const r = 150; 
const centerX = width / 2;
const centerY = height / 2;

class Turtle {
    constructor(ctx) {
        this.ctx = ctx;
        this.x = centerX - r; 
        this.y = centerY - r;
        this.angle = 0; 
        this.penDown = true;
        this.ctx.moveTo(this.x, this.y);
        this.ctx.beginPath();
    }

    forward(distance) {
        const rad = this.angle * (Math.PI / 180);
        const newX = this.x + distance * Math.cos(rad);
        const newY = this.y + distance * Math.sin(rad);

        if (this.penDown) {
            this.ctx.lineTo(newX, newY);
            this.ctx.stroke();
        } else {
            this.ctx.moveTo(newX, newY);
        }

        this.x = newX;
        this.y = newY;
    }

    right(angle) {
        this.angle += angle;
    }
}

function setupBoard() {
    const turtle = new Turtle(ctx);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    for (let i = 0; i < 5; i++) {
        turtle.forward(r * 2);
        turtle.right(90);
    }
    ctx.beginPath();
    ctx.arc(centerX, centerY, r, 0, 2 * Math.PI);
    ctx.strokeStyle = "blue";
    ctx.stroke();
}

let totalPoints = 0; 
let pointsInCircle = 0; 

function runMonteCarloStep() {
    const batchSize = 100; 
    for (let i = 0; i < batchSize; i++) {
        const randX = (Math.random() * 2 * r) - r; 
        const randY = (Math.random() * 2 * r) - r; 
        const distSquared = (randX * randX) + (randY * randY);

        ctx.beginPath();
        const drawX = centerX + randX;
        const drawY = centerY + randY;
        
        if (distSquared <= r * r) {
            pointsInCircle++; 
            ctx.fillStyle = "rgba(0, 255, 0, 0.5)";
        } else {
            ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
        }
        
        ctx.fillRect(drawX, drawY, 2, 2); 
        totalPoints++; 
    }

    const piEstimate = 4 * (pointsInCircle / totalPoints);
    displayStats(piEstimate);
    
    requestAnimationFrame(runMonteCarloStep);
}

function displayStats(piVal) {
    ctx.fillStyle = "white";
    ctx.fillRect(10, 10, 250, 60);
    
    ctx.fillStyle = "black";
    ctx.font = "16px Arial";
    ctx.fillText(`Punti totali (N): ${totalPoints}`, 20, 30);
    ctx.fillText(`Punti nel cerchio (M): ${pointsInCircle}`, 20, 50);
    ctx.font = "bold 20px Arial";
    ctx.fillText(`Pi Greco ≈ ${piVal.toFixed(5)}`, 20, 75);
}

setupBoard();
startButton.addEventListener('click', () => {
    startButton.disabled = true;
    console.log("Avvio simulazione Monte Carlo...");
    runMonteCarloStep();
});

resetButton.addEventListener('click', () => {
    console.log("Resetting simulation...");
    location.reload();
});

montecarloButton.addEventListener('click', () => {
    console.log("Monte Carlo Method selected.");
    trapezoidButton.disabled = false;
    montecarloButton.disabled = true; 
});

trapezoidButton.addEventListener('click', () => {
    console.log("Trapezoid Method selected.");
    trapezoidButton.disabled = true;
    montecarloButton.disabled = false;
    window.location.href = 'trapezoid.html';
});

montecarloButton.disabled = true;


