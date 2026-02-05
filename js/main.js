const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.height = window.innerHeight / 2;
canvas.width = window.innerWidth / 2;

canvas.style.background = "rgb(136, 219, 255)";

const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;

const slider = document.getElementById("circleRange");
const circleCountLabel = document.getElementById("circleCount");

let circles = [];

class Circle {
  constructor(x, y, radius, color, text, speed) {
    this.radius = Math.min(radius, CANVAS_WIDTH / 4, CANVAS_HEIGHT / 4);

    this.posX = Math.max(this.radius, Math.min(x, CANVAS_WIDTH - this.radius));
    this.posY = Math.max(this.radius, Math.min(y, CANVAS_HEIGHT - this.radius));

    this.color = color;
    this.text = text;
    this.speed = speed;

    /* const dirX = Math.random() < 0.5 ? -1 : 1;
    const dirY = Math.random() < 0.5 ? -1 : 1;

    this.dx = this.speed * dirX;
    this.dy = this.speed * dirY; */
    const dirX = Math.random() < 0.5 ? -1 : 1;
const dirY = Math.random() < 0.5 ? -1 : 1;

// La velocidad ahora afecta diferente en X y Y
this.dx = dirX * (Math.random() * this.speed + 1);
this.dy = dirY * (Math.random() * this.speed + 1);

  }

  draw(context) {
    context.beginPath();
    context.strokeStyle = this.color;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "20px Arial";
    context.fillText(this.text, this.posX, this.posY);
    context.lineWidth = 2;
    context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
    context.stroke();
    context.closePath();
  }

  update(context) {
    this.posX += this.dx;
    this.posY += this.dy;

    if (this.posX + this.radius >= CANVAS_WIDTH) {
      this.posX = CANVAS_WIDTH - this.radius;
      this.dx *= -1;
    }

    if (this.posX - this.radius <= 0) {
      this.posX = this.radius;
      this.dx *= -1;
    }

    if (this.posY + this.radius >= CANVAS_HEIGHT) {
      this.posY = CANVAS_HEIGHT - this.radius;
      this.dy *= -1;
    }

    if (this.posY - this.radius <= 0) {
      this.posY = this.radius;
      this.dy *= -1;
    }

    this.draw(context);
  }
}

function randomPosition(radius) {
  return {
    x: Math.random() * (CANVAS_WIDTH - 2 * radius) + radius,
    y: Math.random() * (CANVAS_HEIGHT - 2 * radius) + radius,
  };
}

// 🎯 Función que CREA los círculos según el número del slider
function generateCircles(amount) {
  circles = [];

  for (let i = 0; i < amount; i++) {
    let radius = Math.floor(Math.random() * 60 + 30);
    let pos = randomPosition(radius);
    //let speed = Math.random() * 4 + 1;
    // Velocidad realmente aleatoria y notoria (1 a 6)
    let speed = Math.floor(Math.random() * 6) + 1;


    circles.push(
      new Circle(
        pos.x,
        pos.y,
        radius,
        "blue",
        (i + 1).toString(),
        speed
      )
    );
  }
}

// Mostrar número mientras se mueve el slider
slider.addEventListener("input", () => {
  circleCountLabel.textContent = slider.value;
});

// Cuando sueltas el slider, se regeneran
slider.addEventListener("change", () => {
  generateCircles(parseInt(slider.value));
});

// Animación
function updateCircle() {
  requestAnimationFrame(updateCircle);
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  circles.forEach(circle => circle.update(ctx));
}

// 🔥 Al iniciar la página → 2 círculos
generateCircles(2);
updateCircle();
