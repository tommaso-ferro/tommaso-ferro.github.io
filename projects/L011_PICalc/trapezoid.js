const canvas = document.querySelector('#canvas');
const startButton = document.querySelector('#startbutton')
const resetButton = document.querySelector('#resetbutton')
const montecarloButton = document.querySelector('#montecarloMethod')
const trapezoidButton = document.querySelector('#trapezoidMethod')
const title = document.querySelector('#title')
const numTrapezoidsInput = document.querySelector('#numTrapezoids')
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
    ctx.beginPath();
    ctx.arc(centerX, centerY, r, 0, 2 * Math.PI);
    ctx.strokeStyle = "blue";
    ctx.stroke();
}

function trapezoidMethod() {
    ctx.clearRect(0, 0, width, height);
    setupBoard();

    const n = parseInt(document.querySelector('#numTrapezoids').value);
    const h = 1 / n; 
    let sumArea = 0;
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#ff0000"; 
    ctx.fillStyle = "rgba(255, 0, 0, 0.3)"; 

    for (let i = 0; i < n; i++) {
        let x1 = i * h;
        let x2 = (i + 1) * h;

        let y1 = Math.sqrt(1 - x1 * x1);
        let y2 = Math.sqrt(1 - x2 * x2);

        let areaTrapezio = (y1 + y2) * h / 2;
        sumArea += areaTrapezio;

        let px_x1 = centerX + (x1 * r);
        let px_x2 = centerX + (x2 * r);
        
        let px_y1 = centerY - (y1 * r);
        let px_y2 = centerY - (y2 * r);

        ctx.beginPath();
        ctx.moveTo(px_x1, centerY);     
        ctx.lineTo(px_x1, px_y1);       
        ctx.lineTo(px_x2, px_y2);       
        ctx.lineTo(px_x2, centerY);     
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
    }

    const piApprox = sumArea * 4;
    ctx.fillStyle = "black";
    ctx.font = "bold 24px Arial";
    ctx.fillText(`Trapezi: ${n}`, 20, 40);
    ctx.fillText(`Pi Greco Approx: ${piApprox.toFixed(6)}`, 20, 70);
    
    console.log(`Simulazione terminata. N: ${n}, Pi: ${piApprox}`);
}

setupBoard();
startButton.addEventListener('click', () => {
    startButton.disabled = true;
    console.log("Avvio simulazione Trapezi...");
    trapezoidMethod();
});

resetButton.addEventListener('click', () => {
    console.log("Resetting simulation...");
    location.reload();
});

montecarloButton.addEventListener('click', () => {
    console.log("Monte Carlo Method selected.");
    window.location.href = "index.html";
    trapezoidButton.disabled = false;
    montecarloButton.disabled = true; 
});

trapezoidButton.addEventListener('click', () => {
    console.log("Trapezoid Method selected.");
    trapezoidButton.disabled = true;
    montecarloButton.disabled = false;
});

trapezoidButton.disabled = true;


