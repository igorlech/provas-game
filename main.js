import "./styles/style.scss";
import "./styles/reset.scss";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

class Player {
  constructor() {
    this.velocity = {
      x: 0,
      y: 0,
    };

    this.rotation = 0;

    const image = new Image();
    image.src = "../assets/player.svg";

    image.onload = () => {
      this.image = image;
      this.width = 80;
      this.height = 80;
      this.position = {
        x: canvas.width / 2 - this.width / 2,
        y: canvas.height - this.height - 30,
      };
    };
  }

  drawPlayer() {
    ctx.save();
    ctx.translate(
      player.position.x + player.width / 2,
      player.position.y + player.height / 2
    );

    ctx.rotate(this.rotation);

    ctx.translate(
      -player.position.x - player.width / 2,
      -player.position.y - player.height / 2
    );

    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );

    ctx.restore();
  }

  update() {
    if (this.image) {
      this.drawPlayer();
      this.position.x += this.velocity.x;
    }
  }
}

class Bullets {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = 5;
  }

  drawBullet() {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.drawBullet();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

class Item {
  constructor({ position }) {
    this.velocity = {
      x: 0,
      y: 0,
    };

    const image = new Image();
    image.src = "../assets/banana.svg";

    image.onload = () => {
      this.image = image;
      this.width = 120;
      this.height = 120;
      this.position = {
        x: position.x,
        y: position.y,
      };
    };
  }

  drawPlayer() {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update({ velocity }) {
    if (this.image) {
      this.drawPlayer();
      this.position.x += velocity.x;
      this.position.y += velocity.y;
    }
  }
}

class Grid {
  constructor() {
    this.position = {
      x: 0,
      y: 0,
    };

    this.velocity = {
      x: 1,
      y: 0,
    };

    this.items = [];

    this.items.forEach((item) => {
      item.classList.add("game-item");
    });

    const itemscont = document.createElement("div");
    canvas.appendChild(itemscont);
    itemscont.classList.add("itemscont");
    itemscont.innerHTML = this.items;

    const rows = 1; // Math.floor(Math.random() * 5 + 1)
    const columns = 11;

    // this.width = columns * 1;

    for (let x = 0; x < columns; x++) {
      for (let y = 0; y < rows; y++) {
        this.items.push(
          new Item({
            position: {
              x: Math.floor(Math.random() * 1000) - 1000,
              y: 100,
            },
          })
        );
      }
    }
  }

  update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // this.velocity.y = 0;

    // if (this.position.x + this.width >= canvas.width || this.position.x <= 0) {
    //   this.velocity.x = -this.velocity.x;
    //   this.velocity.y = 30;
    // }
  }
}

const player = new Player();
const bullets = [];
const grids = [new Grid()];

let keysPressed = {
  arrowLeft: {
    pressed: false,
  },
  arrowRight: {
    pressed: false,
  },
  space: {
    pressed: false,
  },
};

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = "lightblue";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  bullets.forEach((bullet, index) => {
    if (bullet.position.y + bullet.radius <= 0) {
      setTimeout(() => {
        bullets.splice(index, 1);
      }, 0);
    } else {
      bullet.update();
    }
  });

  grids.forEach((grid) => {
    grid.update();
    grid.items.forEach((item, index) => {
      item.update({ velocity: grid.velocity });

      bullets.forEach((bullet, i) => {
        if (
          bullet.position.y - bullet.radius <= item.position.y + item.height &&
          bullet.position.x + bullet.radius >= item.position.x &&
          bullet.position.x - bullet.radius <= item.position.x + item.width &&
          bullet.position.y + bullet.radius >= item.position.y
        ) {
          setTimeout(() => {
            const itemFound = grid.items.find((item2) => {
              return item2 === item;
            });

            const bulletFound = bullets.find((bullet2) => {
              return bullet2 === bullet;
            });

            if (itemFound && bulletFound) {
              grid.items.splice(index, 1);
              bullets.splice(i, 1);
            }
          }, 0);
        }
      });
    });
  });

  if (keysPressed.arrowLeft.pressed && player.position.x >= 0) {
    player.velocity.x = -5;
    player.rotation = -0.15;
  } else if (
    keysPressed.arrowRight.pressed &&
    player.position.x + player.width <= canvas.width
  ) {
    player.velocity.x = 5;
    player.rotation = 0.15;
  } else {
    player.velocity.x = 0;
    player.rotation = 0;
  }
}

animate();

// Keyboard events

//TODO: if we have time, we can add cases for a and d keys

addEventListener("keydown", ({ key }) => {
  switch (key) {
    case "ArrowLeft":
      keysPressed.arrowLeft.pressed = true;
      break;
    case "ArrowRight":
      keysPressed.arrowRight.pressed = true;
      break;
    case " ":
      keysPressed.space.pressed = true;
      bullets.push(
        new Bullets({
          position: {
            x: player.position.x + player.width / 2,
            y: player.position.y,
          },
          velocity: {
            x: 0,
            y: -15,
          },
        })
      );
      break;
  }
});

addEventListener("keyup", ({ key }) => {
  switch (key) {
    case "ArrowLeft":
      keysPressed.arrowLeft.pressed = false;
      break;
    case "ArrowRight":
      keysPressed.arrowRight.pressed = false;
      break;
    case " ":
      keysPressed.space.pressed = false;
      break;
  }
});
