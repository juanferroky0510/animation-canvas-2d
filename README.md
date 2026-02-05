# 🎯 Animación de Círculos en Canvas con JavaScript

Este proyecto muestra una **animación en tiempo real** utilizando el elemento **`<canvas>`** de HTML y programación orientada a objetos en **JavaScript**.

Se crean círculos que se mueven dentro de la pantalla, rebotando en los bordes del navegador, mostrando texto en su interior y desplazándose a diferentes velocidades.

---

## 🧠 Conceptos aplicados

- Canvas API
- Programación Orientada a Objetos (POO)
- Animaciones con `requestAnimationFrame`
- Detección de colisiones con bordes
- Uso de coordenadas dinámicas según el tamaño de la ventana
- Generación de valores aleatorios con `Math.random`

---

## 🖥️ Funcionamiento general

1. El canvas toma el tamaño completo de la ventana del navegador.
2. Se crean objetos de la clase `Circle`.
3. Cada círculo tiene posición, radio, color, texto y velocidad.
4. Los círculos se mueven constantemente.
5. Cuando tocan un borde de la pantalla, rebotan.
6. La animación se ejecuta continuamente con `requestAnimationFrame`.


---

---

## ▶️ Cómo ejecutar el proyecto

1. Descargar los archivos del proyecto.
2. Abrir el archivo `index.html` en el navegador.
3. Visualizar la animación en pantalla completa.

No se requieren librerías externas.

---

## 🧩 Código principal del proyecto

A continuación se muestra el código completo utilizado en la animación:

```javascript
const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

//Obtiene las dimensiones de la pantalla actual
const window_height = window.innerHeight;
const window_width = window.innerWidth;

//El canvas tiene las mismas dimensiones que la pantalla
canvas.height = window_height;
canvas.width = window_width;

canvas.style.background = "#ff8";

class Circle {
  constructor(x, y, radius, color, text, speed) {
    this.posX = x;
    this.posY = y;
    this.radius = radius;
    this.color = color;
    this.text = text;

    this.speed = speed;

    this.dx = 1 * this.speed;
    this.dy = 1 * this.speed;
  }

  draw(context) {
    context.beginPath();

    context.strokeStyle = this.color;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "20px Arial";
    context.fillText(this.text, this.posX, this.posY);

    context.lineWidth = 2;
    context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
    context.stroke();
    context.closePath();
  }

  update(context) {
    this.draw(context);

    // Rebote en bordes laterales
    if (this.posX + this.radius > window_width) {
      this.dx = -this.dx;
    }

    if (this.posX - this.radius < 0) {
      this.dx = -this.dx;
    }

    // Rebote en bordes superior e inferior
    if (this.posY - this.radius < 0) {
      this.dy = -this.dy;
    }

    if (this.posY + this.radius > window_height) {
      this.dy = -this.dy;
    }

    this.posX += this.dx;
    this.posY += this.dy;
  }
}

// Valores aleatorios para posición y tamaño
let randomX = Math.random() * window_width;
let randomY = Math.random() * window_height;
let randomRadius = Math.floor(Math.random() * 100 + 30);

// Creación de círculos
let miCirculo = new Circle(randomX, randomY, randomRadius, "blue", "Tec1", 5);
miCirculo.draw(ctx);

let miCirculo2 = new Circle(randomX, randomY, randomRadius, "red", "Tec2", 2);
miCirculo2.draw(ctx);

// Función de animación
let updateCircle = function () {
  requestAnimationFrame(updateCircle);
  ctx.clearRect(0, 0, window_width, window_height);
  miCirculo.update(ctx);
  miCirculo2.update(ctx);
};

updateCircle();
