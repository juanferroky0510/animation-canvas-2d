const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// Tamaño REAL del canvas
canvas.height = window.innerHeight / 2;
canvas.width = window.innerWidth / 2;

canvas.style.background = "rgb(136, 219, 255)";

const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;

class Circle {
  constructor(x, y, radius, color, text, speed) {
    this.radius = Math.min(radius, CANVAS_WIDTH / 4, CANVAS_HEIGHT / 4);

    this.posX = Math.max(this.radius, Math.min(x, CANVAS_WIDTH - this.radius));
    this.posY = Math.max(this.radius, Math.min(y, CANVAS_HEIGHT - this.radius));

    this.color = color;
    this.text = text;
    this.speed = speed;

    // Dirección inicial aleatoria
    const dirX = Math.random() < 0.5 ? -1 : 1;
    const dirY = Math.random() < 0.5 ? -1 : 1;

    this.dx = this.speed * dirX;
    this.dy = this.speed * dirY;
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

    // Rebote CORRECTO y reposicionamiento
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

// Función para generar posiciones válidas
function randomPosition(radius) {
  return {
    x: Math.random() * (CANVAS_WIDTH - 2 * radius) + radius,
    y: Math.random() * (CANVAS_HEIGHT - 2 * radius) + radius,
  };
}

// Crear círculos
let radius1 = Math.floor(Math.random() * 100 + 30);
let pos1 = randomPosition(radius1);

let miCirculo = new Circle(pos1.x, pos1.y, radius1, "blue", "Tec1", 5);

let radius2 = Math.floor(Math.random() * 100 + 30);
let pos2 = randomPosition(radius2);

let miCirculo2 = new Circle(pos2.x, pos2.y, radius2, "red", "Tec2", 2);

// Animación
function updateCircle() {
  requestAnimationFrame(updateCircle);
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  miCirculo.update(ctx);
  miCirculo2.update(ctx);
}

updateCircle();
