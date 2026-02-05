const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const circleSlider = document.getElementById("circleRange");
const widthSlider = document.getElementById("widthRange");
const heightSlider = document.getElementById("heightRange");

const circleCountLabel = document.getElementById("circleCount");
const widthLabel = document.getElementById("widthValue");
const heightLabel = document.getElementById("heightValue");

let circles = [];
let CANVAS_WIDTH;
let CANVAS_HEIGHT;

// 🔥 Ajusta el tamaño del canvas según porcentaje
function resizeCanvas(wPercent, hPercent) {
  CANVAS_WIDTH = window.innerWidth * (wPercent / 100);
  CANVAS_HEIGHT = window.innerHeight * (hPercent / 100);

  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  repositionCircles();
}

// 🔥 Reposiciona los círculos dentro del nuevo tamaño
/* function repositionCircles() {
  circles.forEach(c => {
    c.posX = Math.max(c.radius, Math.min(c.posX, CANVAS_WIDTH - c.radius));
    c.posY = Math.max(c.radius, Math.min(c.posY, CANVAS_HEIGHT - c.radius));
  });
} */
function repositionCircles() {
  circles.forEach(c => {

    // Reposicionar dentro del canvas
    c.posX = Math.max(c.radius, Math.min(c.posX, CANVAS_WIDTH - c.radius));
    c.posY = Math.max(c.radius, Math.min(c.posY, CANVAS_HEIGHT - c.radius));

    // 🔥 Corregir dirección si quedó pegado al borde
    if (c.posX + c.radius >= CANVAS_WIDTH && c.dx > 0) {
      c.dx *= -1;
    }

    if (c.posX - c.radius <= 0 && c.dx < 0) {
      c.dx *= -1;
    }

    if (c.posY + c.radius >= CANVAS_HEIGHT && c.dy > 0) {
      c.dy *= -1;
    }

    if (c.posY - c.radius <= 0 && c.dy < 0) {
      c.dy *= -1;
    }
  });
}


class Circle {
  constructor(x, y, radius, text) {
    this.radius = radius;
    this.text = text;

    this.posX = x;
    this.posY = y;

    let speed = Math.floor(Math.random() * 6) + 1;

    const dirX = Math.random() < 0.5 ? -1 : 1;
    const dirY = Math.random() < 0.5 ? -1 : 1;

    this.dx = dirX * (Math.random() * speed + 1);
    this.dy = dirY * (Math.random() * speed + 1);
  }

  draw() {
    ctx.beginPath();
    ctx.strokeStyle = "blue";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "20px Arial";
    ctx.fillText(this.text, this.posX, this.posY);
    ctx.lineWidth = 2;
    ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.closePath();
  }

  update() {
    this.posX += this.dx;
    this.posY += this.dy;

    if (this.posX + this.radius >= CANVAS_WIDTH || this.posX - this.radius <= 0) {
      this.dx *= -1;
    }

    if (this.posY + this.radius >= CANVAS_HEIGHT || this.posY - this.radius <= 0) {
      this.dy *= -1;
    }

    this.draw();
  }
}

// 🎯 Genera círculos sin perder los existentes
function generateCircles(amount) {
  circles = [];

  for (let i = 0; i < amount; i++) {
    let radius = Math.floor(Math.random() * 50 + 25);

    let x = Math.random() * (CANVAS_WIDTH - 2 * radius) + radius;
    let y = Math.random() * (CANVAS_HEIGHT - 2 * radius) + radius;

    circles.push(new Circle(x, y, radius, (i + 1).toString()));
  }
}

// Eventos sliders
circleSlider.addEventListener("input", () => {
  circleCountLabel.textContent = circleSlider.value;
});

circleSlider.addEventListener("change", () => {
  generateCircles(parseInt(circleSlider.value));
});

widthSlider.addEventListener("input", () => {
  widthLabel.textContent = widthSlider.value;
});

heightSlider.addEventListener("input", () => {
  heightLabel.textContent = heightSlider.value;
});

widthSlider.addEventListener("change", () => {
  resizeCanvas(widthSlider.value, heightSlider.value);
});

heightSlider.addEventListener("change", () => {
  resizeCanvas(widthSlider.value, heightSlider.value);
});

// Animación
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  circles.forEach(c => c.update());
}

// Inicial
resizeCanvas(50, 50);
generateCircles(2);
animate();
